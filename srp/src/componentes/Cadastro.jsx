// src/components/Cadastro.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css';     
import '../styles/Global.css';     
import logoSol from "../img/Sun (1).png";


const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }

    const dadosUsuario = { nome, email, senha };
    setCarregando(true);
    setMensagem('');

    try {
      const resposta = await axios.post('https://b826-179-119-58-114.ngrok-free.app/user/register', dadosUsuario); // URL relativa com proxy
      setMensagem(resposta.data.message);
      setNome('');
      setEmail('');
      setSenha('');
    } catch (error) {
      if (error.response) {
        setMensagem(`Erro: ${error.response.data.message}`);
      } else {
        setMensagem(`Erro de conexão: ${error.message}`);
      }
      console.error('Erro:', error);
    } finally {
      setCarregando(false);
    }
  };

  // Retorno do JSX
  return (
    <div className="auth-container">
    <div className='form-container' >
    <div className="top">
          <div className="logo-form">
            <img src={logoSol} alt="Profile"></img>
          </div>
          <h2>Cadastro</h2>
        </div>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Nome:</label>
          <input 
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={carregando}>
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default Cadastro;

