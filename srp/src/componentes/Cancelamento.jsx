// src/components/Cadastro.jsx
import React, { useState } from "react";
import "../styles/Global.css";
import "../styles/Cancelamento.css";
import logoSolForm from "../img/Sun (1).png";
import { useNavigate } from "react-router-dom";
import logoSrp from '../img/SRP Viagens.png'
import logoSol from '../img/Sun.png'

const Cancelamento = () => {

  const navigate = useNavigate();

  const voltar = () => {
    navigate(-1)
  }

  return (
      <div className="cancel-container">
        <div className="form-container">
          <div className="top">
            <div className="logo-form">
              <img src={logoSolForm} alt="Profile"></img>
            </div>
            <h2>Cancelamento</h2>
          </div>
          <form>
            <div className="input-cancel">
              <label>Cpf:</label>
              <input type="text" required />
            </div>
            <div className="input-cancel">
              <label>Senha:</label>
              <input type="email" required />
            </div>
            <div className="input-cancel">
              <label>Justificativa:</label>
              <textarea
                id="mensagem"
                rows="4"
                cols="50"
                placeholder="Digite sua mensagem aqui..."
                required
              ></textarea>
            </div>
            <div className="cancel">
            <button type="submit">Cancelar Reserva</button>
            <p>Foi engano? Clique no botão a baixo para voltar</p>
            <button type="submit" onClick={voltar} className="Voltar">Voltar</button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Cancelamento;
