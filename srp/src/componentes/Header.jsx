import React from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth  } from "../componentes/Auth";
import logoSrp from "../img/SRP Viagens.png";
import logoSol from "../img/Sun.png";


const Header = () => {
  const navigate = useNavigate(); // Para navegação
  const { logado, login } = useAuth();

  // Redirecionar para as páginas de login, cadastro e perfil
  const handleLoginRedirect = () => {
    navigate("/login");
    login(); 
  };

  const handleCadastroRedirect = () => {
    navigate("/cadastro");
  };

  const handlePerfilRedirect = () => {
    navigate("/perfil"); 
  };

  const handleInicioRedirect = () => {
    navigate("/"); 
  };
  const handleSobreRedirect = () => {
    navigate("/sobre"); 
  };
  const handleViagemRedirect = () => {
    navigate("/viagem"); 
  };
  const handleCancelamentoRedirect = () => {
    navigate("/sobrecancelamento"); 
  };
  const handleAjudaRedirect = () => {
    navigate("/ajuda"); 
  };

  return (
      <header>
        <div className="logo">
          <img src={logoSol} alt="Profile" />
          <img src={logoSrp} alt="Profile" />
        </div>
        <ul>
          <li>
            <a onClick={handleInicioRedirect}>Inicio</a>
          </li>
          <li>
            <a onClick={handleSobreRedirect}>Sobre</a>
          </li>
          <li>
            <a onClick={handleViagemRedirect}>Viagem</a>
          </li>
          <li>
            <a onClick={handleCancelamentoRedirect}>Cancelamento</a>
          </li>
          <li>
            <a onClick={handleAjudaRedirect}>Ajuda</a>
          </li>
        </ul>
        <div className="login-cadastro">
          {logado ? (
            <>
              <button type="button" onClick={handlePerfilRedirect}>Perfil</button>
            </>
          ) : (
            <>
              <button type="button" onClick={handleLoginRedirect}>Entrar</button>
              <button type="button" className="cadastro" onClick={handleCadastroRedirect}>Cadastro</button>
            </>
          )}
        </div>
      </header>
      );
};

export default Header;