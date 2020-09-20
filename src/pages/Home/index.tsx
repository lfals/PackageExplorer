import React, {useState, FormEvent, useEffect} from 'react';
import { FiChevronRight, FiSmile } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/logo.svg'
import logoCorreios from '../../assets/correios.svg'


import { Title,  Repositories } from './styles'

const Dashboard: React.FC = () => {

    return (
    <>
        <img src={logoImg} alt="Github Explorer"/>
        <Title>Acompanhe suas encomendas</Title>
        <p>Escolha a transportadora</p>

        <Repositories>
                <Link key={192387} to={`/correios`}>
                    <img src={logoCorreios} alt="correios"/>
                    <div>
                        <strong>Correios</strong>
                        <p>Rastreio pelos correios</p>
                    </div>
                    <FiChevronRight size={20} />
                </Link>
                <Link key={192387} to={`/novidades`}>
                          <FiSmile size={64}/>
                    <div>
                        <strong>Em breve!</strong>
                        <p>novidades</p>
                    </div>
                    <FiChevronRight size={20} />
                </Link>

        </Repositories>
    </>
    )
}

export default Dashboard;
