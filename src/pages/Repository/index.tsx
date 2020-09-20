import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom'

import axios from 'axios'

import logoImg from '../../assets/logo.svg'

import { Header, RepositoryInfo, Issues, Cards } from './styles'
import { FiChevronLeft,FiSend } from 'react-icons/fi';

interface RepositoryParams {
    repository: string;
    name: string
}

interface Respository {
  codigo: string,
  eventos: Array<string>,
  servico: string,
  quantidade: number,
  ultimo: String,
  shippedIn: string
}

interface Issue {
    data: string;
    hora: string;
    local: string
    status: string
}


const Repository: React.FC = () => {
    const [repository, setRepository] = useState<Respository | null>(null)
    const [issues, setIssues] = useState<Issue[]>([])

    const { params } = useRouteMatch<RepositoryParams>()

    useEffect(() => {
        axios.get(`https://api.linketrack.com/track/json?user=teste&token=1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f&codigo=${params.repository}`).then((response) => {


          const { quantidade, servico, eventos, codigo, ultimo } = response.data
          const shippedDate = response.data.eventos[response.data.eventos.length - 1].data
          const data = response.data.eventos[0].data


          console.log(shippedDate)

          const details = [{
            quantidade,
            servico,
            eventos,
            codigo,
            ultimo: data,
            shippedIn: shippedDate
          }]

        setIssues(eventos)
        setRepository(details[0])

        })

    },[params.repository])




return (
    <>
        <Header>
            <img src={logoImg} alt="Github explorer"/>
            <Link to="/correios">
                <FiChevronLeft size={16} />
                Voltar
            </Link>
        </Header>

    { repository && (
        <RepositoryInfo>
        <header>
            {/* <img src={repository. alt={repository.owner.login}/> */}
            <div>
                    {<strong>{repository.codigo}</strong>}
                    {/* <p>{repository.codigo}</p> */}
            </div>
        </header>
        <ul>
            <li>
                <strong>Last update</strong>
                {<span>{repository.ultimo}</span>}
            </li>
            <li>
                <strong>Shipped in</strong>
                <span>{repository.shippedIn}</span>
            </li>
            {/* <li>
                <strong>Util Days</strong>
                <span>{repository.shippedIn}</span>
            </li> */}


        </ul>
    </RepositoryInfo>
    ) }

        <Issues>
            {issues.map(issue => (
                <Cards>
                <div>
                <strong>{issue.status}</strong>
                <p>{issue.local}</p>
                <p>{issue.data}</p>
                </div>

            </Cards>
            ))}
        </Issues>
    </>
)
}
export default Repository;
