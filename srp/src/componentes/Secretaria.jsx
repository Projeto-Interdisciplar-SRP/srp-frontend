import React, { useState } from 'react';
import '../styles/Secretaria.css';
import HeaderSecretaria from './Header-Secretaria';
import { useNavigate } from 'react-router-dom';
import logoSrp from '../img/SRP Viagens.png';
import logoSol from '../img/Sun.png';

const Secretaria = () => {
  const [activeLink, setActiveLink] = useState(null);
const navigate = useNavigate();

const handleCrudCoordenadores = () => {
    navigate('/secretaria/crudcoordenador');  // Redireciona para a página de login
    
};
const handleCrudOnibus = () => {
    navigate('/secretaria/crudonibus');  // Redireciona para a página de login
};
const handleRelatorio = () => {
    navigate('/secretaria/relatorio');  // Redireciona para a página de login
};


  return (
    <div className="container">
      <HeaderSecretaria/>

      <main>
        <h1>Secretária</h1>
        <div className="inicio">
          <div className="CRUD">
            <h3>Coordenadores</h3>
            <button onClick={handleCrudCoordenadores}>Ver Coordenadores</button>
          </div>
          <div className="CRUD">
            <h3>Onibus</h3>
            <button onClick={handleCrudOnibus}> Ver Onibus</button>
          </div>
          <div className="CRUD">
            <h3>Ingresso</h3>
            <button>Ver Ingressos</button>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default Secretaria;
