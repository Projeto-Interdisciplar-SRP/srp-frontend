import React, { useState } from "react";
import axios from "axios";
import "../styles/Secretaria.css";

import { useNavigate } from "react-router-dom";
import logoSrp from "../img/SRP Viagens.png";
import logoSol from "../img/Sun.png";

const Secretaria = () => {
  const navigate = useNavigate();

  // Estado local para o formulário de ingresso
  const [ingresso, setIngresso] = useState({
    titulo: "",
    dataIda: "",
    horarioIda: "",
    dataVolta: "",
    horarioVolta: "",
    destinoFinal: "",
    lugarEmbarque: "",
    preco: 0,
  });

  // Função para lidar com a mudança dos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngresso({ ...ingresso, [name]: value });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar os dados do ingresso para a API
      await axios.post("https://sua-api.com/ingressos", ingresso);
      alert("Ingresso cadastrado com sucesso!");
      // Limpar o formulário após o cadastro
      setIngresso({
        titulo: "",
        dataIda: "",
        horarioIda: "",
        dataVolta: "",
        horarioVolta: "",
        destinoFinal: "",
        lugarEmbarque: "",
        preco: 0,
      });
    } catch (error) {
      console.error("Erro ao cadastrar ingresso:", error);
      alert("Erro ao cadastrar ingresso.");
    }
  };

  const handleCadCoordenador = () => {
    navigate("/secretaria/cadcoordenador");
  };

  const handleCadOnibus = () => {
    navigate("/secretaria/cadonibus");
  };

  const handleRelatorio = () => {
    navigate("/secretaria/relatorio");
  };

  const handleCadIngresso = () => {
    navigate("/secretaria/cadingresso");
  };

  const handleVoltar = () => {
    navigate("/secretaria");
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
          <li onClick={handleCadIngresso} className="link-cadingresso">
            Cadastrar Ingresso
          </li>
          <li onClick={handleRelatorio}>Relatórios</li>
        </ul>
      </header>

      <main>
        <div className="title-back">
          <h1>Secretária</h1>
          <button onClick={handleVoltar} className="link-secretaria">
            Voltar
          </button>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="dados">
              <div className="input-group">
                <label>Título</label>
                <input
                  type="text"
                  name="titulo"
                  value={ingresso.titulo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Destino Final</label>
                <input
                  type="text"
                  name="destinoFinal"
                  value={ingresso.destinoFinal}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="dados">
              <div className="input-group">
                <label>Data de Ida</label>
                <input
                  type="date"
                  name="dataIda"
                  value={ingresso.dataIda}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Horário de Ida</label>
                <input
                  type="text"
                  name="horarioIda"
                  value={ingresso.horarioIda}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="dados">
              <div className="input-group">
                <label>Data de Volta</label>
                <input
                  type="date"
                  name="dataVolta"
                  value={ingresso.dataVolta}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Horário de Volta</label>
                <input
                  type="text"
                  name="horarioVolta"
                  value={ingresso.horarioVolta}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Preço</label>
              <input
                type="number"
                name="preco"
                value={ingresso.preco}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Cadastrar Ingresso</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Secretaria;
