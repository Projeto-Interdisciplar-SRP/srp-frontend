// src/components/Cadastro.jsx
import React, { useState } from "react";
// import axios from 'axios';
import "../styles/Auth.css";
import "../styles/Global.css";
import logoSolForm from "../img/Sun (1).png";

import logoSrp from '../img/SRP Viagens.png'
import logoSol from '../img/Sun.png'

const Cancelamento = () => {
  return (
    <div className="container">
      <header>
        <div className="logo">
          <img src={logoSol} alt="Profile"></img>
          <img src={logoSrp} alt="Profile"></img>
        </div>
        <ul>
          <li>
            <a>Inicio</a>
          </li>
          <li>
            <a href="">Sobre</a>
          </li>
          <li>
            <a href="">Viagem</a>
          </li>
          <li>
            <a href="">Cancelamento</a>
          </li>
          <li>
            <a href="">Ajuda</a>
          </li>
        </ul>
        <div className="login-cadastro">
          <button type="button">Entrar</button>
          <button type="button" className="cadastro">
            Cadastro
          </button>
        </div>
      </header>
      <div className="auth-container">
        <div className="form-container">
          <div className="top">
            <div className="logo-form">
              <img src={logoSolForm} alt="Profile"></img>
            </div>
            <h2>Cancelamento</h2>
          </div>
          <form>
            <div className="input-group">
              <label>Cpf:</label>
              <input type="text" required />
            </div>
            <div className="input-group">
              <label>Senha:</label>
              <input type="email" required />
            </div>
            <div className="input-group">
              <label>Justificativa:</label>
              <textarea
                id="mensagem"
                rows="4"
                cols="50"
                placeholder="Digite sua mensagem aqui..."
                required
              ></textarea>
            </div>
            <button type="submit">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cancelamento;
