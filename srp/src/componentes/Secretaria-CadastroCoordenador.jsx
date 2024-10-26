import React, { useState } from "react";
import axios from "axios";
import "../styles/Secretaria.css";
import { useNavigate } from "react-router-dom";
import logoSrp from "../img/SRP Viagens.png";
import logoSol from "../img/Sun.png";

const Secretaria = () => {
  const navigate = useNavigate();

  // Estado local para o formulário
  const [coordenador, setCoordenador] = useState({
    nome: "",
    cpf: "",
    rg: "",
    email: "",
    dataNascimento: "",
    senha: "",
  });

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

  // Função para lidar com mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoordenador({ ...coordenador, [name]: value });
  };

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envia os dados para a API
      await axios.post("https://sua-api.com/coordenadores", coordenador);
      alert("Coordenador cadastrado com sucesso!");
      setCoordenador({
        nome: "",
        cpf: "",
        rg: "",
        email: "",
        dataNascimento: "",
        senha: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar coordenador:", error);
      alert("Erro ao cadastrar coordenador.");
    }
  };

  return (
    <div className="container">
      <header className="header-secre">
        <div className="logo">
          <img src={logoSol} alt="Logo Sol" />
          <img src={logoSrp} alt="Logo SRP" />
        </div>
        <ul className="menu">
          <li onClick={handleCadCoordenador} className="link-cad-coordenador">Cadastrar Coordenador</li>
          <li onClick={handleCadOnibus}>Cadastrar Ônibus</li>
          <li onClick={handleCadIngresso}>Cadastrar Ingresso</li>
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
        <h3>Cadastro de Coordenador(a)</h3>
        <div className="form-container">
          
          <form onSubmit={handleSubmit}>
            <div className="dados">
            <div className="input-group">
              <label>Nome do Coordenador(a)</label>
              <input
                type="text"
                name="nome"
                value={coordenador.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>CPF</label>
              <input
                type="text"
                name="cpf"
                value={coordenador.cpf}
                onChange={handleChange}
                required
              />
            </div>
            </div>
            <div className="dados">
            <div className="input-group">
              <label>RG</label>
              <input
                type="text"
                name="rg"
                value={coordenador.rg}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={coordenador.email}
                onChange={handleChange}
                required
              />
            </div>
            </div>
            <div className="dados">
            <div className="input-group">
              <label>Data de Nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={coordenador.dataNascimento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Senha</label>
              <input
                type="password"
                name="senha"
                value={coordenador.senha}
                onChange={handleChange}
                required
              />
            </div>
            </div>
            <button type="submit">Cadastrar Coordenador</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Secretaria;
