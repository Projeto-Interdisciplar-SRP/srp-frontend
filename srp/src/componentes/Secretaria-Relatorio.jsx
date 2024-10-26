import React, { useState } from 'react';
import '../styles/Secretaria.css';

import { useNavigate } from 'react-router-dom';
import logoSrp from '../img/SRP Viagens.png';
import logoSol from '../img/Sun.png';

const Secretaria = () => {
  
const navigate = useNavigate();

const handleCadCoordenador = () => {
    navigate('/secretaria/cadcoordenador');  // Redireciona para a página de login
};
const handleCadOnibus = () => {
    navigate('/secretaria/cadonibus');  // Redireciona para a página de login
};
const handleRelatorio = () => {
    navigate('/secretaria/relatorio');  // Redireciona para a página de login
};
const handleCadIngresso = () => {
    navigate('/secretaria/cadingresso');  // Redireciona para a página de login
};
const handleVoltar = () => {
  navigate("/secretaria"); // Redireciona para a página de login
};


  return (
    <div className="container">
      <header className="header-secre">
        <div className="logo">
          <img src={logoSol} alt="Logo Sol" />
          <img src={logoSrp} alt="Logo SRP" />
        </div>
        <ul className="menu">
          <li onClick={handleCadCoordenador}>Cadastrar Coordenador</li>
          <li onClick={handleCadOnibus}>Cadastrar Ônibus</li>
          <li onClick={handleCadIngresso}>Cadastrar Ingresso</li>
          <li onClick={handleRelatorio} className='link-relatorio'>Relatórios</li>
        </ul>
      </header>

      <main>
      <div className="title-back">
          <h1>Secretária</h1>
          <button onClick={handleVoltar} className="link-secretaria">
            Voltar
          </button>
        </div>
          <div className="relatorio">
            <h2>Relatório</h2>
            <div className="dados-relatorios">
              <div className="ingressos">
                <h3>Ingressos</h3>
                <p>Quantidade de Vendas</p>
                <p>Preço</p>
                <p>Total: R$121.212,00</p>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
};

export default Secretaria;
