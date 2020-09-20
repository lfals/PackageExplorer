import React, {useState, FormEvent, useEffect} from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/logo.svg'


import { Title, Form, Repositories, Error, Header } from './styles'
import axios from 'axios';

interface Respository {
    codigo: string,
    eventos: Array<string>,
    servico: string,
    quantidade: number,
    ultimo: String,
    name:string,
    status: string,
}

const Dashboard: React.FC = () => {
    const [inputError, setInputError] = useState('')
    const [newRepo, setNewRepo] = useState('')
    const [newRepoName, setNewRepoName] = useState('')
    const [repositories, setRepositories] = useState<Respository[]>(() => {
        const storageRepositories = localStorage.getItem('@GithubExplorer:repositories')

        if(storageRepositories) {
            return JSON.parse(storageRepositories)
        }
        return []
    })

    useEffect(() => {
        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories))
    }, [repositories])

    async function handleAddRepo(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

          if(!newRepo){
            console.log()
            setInputError('Esqueceu de colocar o código')
          return
          }
          if(!newRepo){
            setInputError('Esqueceu de colocar o código')
            return

        }try {

            const response = await axios.get(`https://api.linketrack.com/track/json?user=teste&token=1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f&codigo=${newRepo}`)

            const { quantidade, servico, eventos, codigo, ultimo } = response.data

            const shippedDate = response.data.eventos[0].status
            const data = new Date(ultimo).toUTCString()

            const repository = [{
              name: newRepoName,
              quantidade,
              servico,
              eventos,
              codigo,
              ultimo: data,
              status: shippedDate,
            }]



          for (let i = 0; i < repositories.length; i++) {
                if(repository[0].codigo == repositories[i].codigo){
                    setInputError('Esta encomenda já está registrada')
                   return
                }
          }

            setRepositories([...repositories, repository[0]])
            setNewRepo('')
            setNewRepoName('')
            setInputError('')

        } catch (Err) {
            setInputError('Erro na busca por essa encomenda')
        }
    }

    return (
    <>
           <Header>
            <img src={logoImg} alt="Github explorer"/>
            <Link to="/">
                <FiChevronLeft size={16} />
                Voltar
            </Link>
        </Header>
        <Title>Acompanhe suas encomendas</Title>

        <Form hasError={Boolean(!!inputError)} onSubmit={handleAddRepo}>
          <input
            value={newRepoName}
            onChange={ (e)=> setNewRepoName(e.target.value)}
            placeholder="Digite o nome da encomenda"/>

            <input
            value={newRepo}
            onChange={ (e)=> setNewRepo(e.target.value)}
            placeholder="Digite o código de rastreio"/>
            <button type="submit">Adicionar</button>
        </Form>

        { inputError && <Error>{inputError}</Error> }

        <Repositories>
            {repositories.map(repository => (
                <Link key={repository.codigo} to={`/repository/${repository.codigo}`}>

                    {/* <img src={repository.owner.avatar_url} alt={repository.owner.login}/> */}

                    <div>
                        <strong>{repository.name}</strong>
                        <p>{repository.status}</p>
                    </div>

                    <FiChevronRight size={20} />
                </Link>
            ))}
        </Repositories>
    </>
    )
}

export default Dashboard;
