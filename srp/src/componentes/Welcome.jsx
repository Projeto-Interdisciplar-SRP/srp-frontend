import React from "react";
import '../styles/Welcome.css';
import { useNavigate } from "react-router-dom";
import logoSol from "../img/Sun (1).png";

const Welcome = () => {

    const navigate = useNavigate()

  return (
    <div className="welcome-container">
      <img className="logo-form" src={logoSol} />
      <h1 className="welcome-title">SRP</h1>
      <p className="welcome-subtitle">Seja Bem-Vindo a SRP!! Caso já tenha um conta clique em Entrar. 
      Caso ainda não tem Conta Clique nos respectivos Botões. 
      </p>
      
      <div className="div-buttons">
        <button className="welcome-button login" onClick={() => navigate("/login")}>Entrar</button>
        <div className="opcoes">
        <button className="welcome-button cadastrar" onClick={() => navigate("confirmar/cadastro/coordenador")}>Sou Coordenador</button>
        <button className="welcome-button cadastrar" onClick={() => navigate("/cadastro")}>Sou Passageiro</button>
        </div>
      </div>
      
    </div>
  );
};

export default Welcome;
