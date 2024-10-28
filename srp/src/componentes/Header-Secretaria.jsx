import React, { useState } from 'react';
import '../styles/Secretaria.css';

import { useNavigate } from 'react-router-dom';
import logoSrp from '../img/SRP Viagens.png';
import logoSol from '../img/Sun.png';

const HeaderSecretaria = () => {
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

  return (
      <header className="header-secre">
        <div className="logo" >
          <img src={logoSol} alt="Logo Sol" />
          <img src={logoSrp} alt="Logo SRP" />
        </div>
        <ul className="menu">
          <li onClick={handleCadCoordenador}>Cadastrar Coordenador</li>
          <li onClick={handleCadOnibus}>Cadastrar Ônibus</li>
          <li onClick={handleCadIngresso}>Cadastrar Ingresso</li>
          <li onClick={handleRelatorio}>Relatórios</li>
        </ul>
      </header>
  );
};

export default HeaderSecretaria;
