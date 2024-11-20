import React from 'react';
import '../styles/Secretaria.css';
import { useNavigate } from 'react-router-dom';
import logoSrp from '../img/SRP Viagens.png';
import logoSol from '../img/Sun.png';

const Secretaria = () => {
  
const navigate = useNavigate();
  

const cadastrarOnibus = async (dadosOnibus) => {
  try {
    const response = await fetch("/api/onibus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosOnibus),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar o ônibus");
    }

    alert("Ônibus cadastrado com sucesso!");
  } catch (error) {
    console.error("Erro:", error);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();

  const dadosOnibus = {
    placa: e.target.elements.placa.value,
    marca: e.target.elements.marca.value, 
    modelo: e.target.elements.modelo.value,
    ano: e.target.elements.ano.value,
    assentos: e.target.elements.assentos.value,
    motorista: {
      nome: e.target.elements.nomeMotorista.value,
      cpf: e.target.elements.cpf.value,
      rg: e.target.elements.rg.value,
      dataNascimento: e.target.elements.dataNascimento.value,
    },
  };

  cadastrarOnibus(dadosOnibus);
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
          <li onClick={handleCadOnibus} className='link-cadonibus'>Cadastrar Ônibus</li>
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
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="dados">
              <div className="input-group">
                <label>Placa</label>
                <input type="text" name="placa" />
              </div>
              <div className="input-group">
                <label>Marca</label>
                <input type="text" name="marca" />
              </div>
            </div>
            <div className="dados">
              <div className="input-group">
                <label>Modelo</label>
                <input type="text" name="modelo" />
              </div>
              <div className="input-group">
                <label>Ano</label>
                <input type="number" name="ano" />
              </div>
              <div className="input-group">
                <label>Quantidade de Assentos</label>
                <input type="number" name="assentos" />
              </div>
            </div>
            <div className="dados">
              <div className="input-group">
                <label>Nome do Motorista</label>
                <input type="text" name="nomeMotorista" />
              </div>
              <div className="input-group">
                <label>CPF</label>
                <input type="number" name="cpf" />
              </div>
            </div>
            <div className="dados">
              <div className="input-group">
                <label>RG</label>
                <input type="number" name="rg" />
              </div>
              <div className="input-group">
                <label>Data de Nascimento</label>
                <input type="date" name="dataNascimento" />
              </div>
            </div>
            <button type="submit">Cadastrar Ônibus</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Secretaria;
