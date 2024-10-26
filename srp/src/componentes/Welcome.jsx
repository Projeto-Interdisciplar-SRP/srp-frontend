import React from "react";
import '../styles/Welcome.css'; // Importa o arquivo de estilo CSS
import { useNavigate } from "react-router-dom";

const Welcome = ({ nome }) => {

    const navigate = useNavigate()

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Bem-vindo, {nome}!</h1>
      <p className="welcome-subtitle">Estamos felizes em ter você aqui. 😊</p>
      
      <button className="welcome-button cadastrar" onClick={() => navigate("/cadastro")}>Cadastrar</button>
      <button className="welcome-button login" onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default Welcome;
