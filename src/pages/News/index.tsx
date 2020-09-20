import React from 'react';
import { Link } from 'react-router-dom'


import logoImg from '../../assets/logo.svg'

import { Header, Title} from './styles'
import { FiChevronLeft } from 'react-icons/fi';


const Repository: React.FC = () => {

return (
    <>
        <Header>
            <img src={logoImg} alt="Github explorer"/>
            <Link to="/correios">
                <FiChevronLeft size={16} />
                Voltar
            </Link>
        </Header>
        <Title>Novidades em breve</Title>

        </>
)
}
export default Repository;
