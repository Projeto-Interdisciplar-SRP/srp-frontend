// src/components/Cadastro.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css';    

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
      const resposta = await axios.post('https://5e17-2804-7f0-a218-1f0d-b8f2-469-7008-88cd.ngrok-free.app/user/register', dadosUsuario); // URL relativa com proxy
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
    <div>
      <h2>Cadastro de Usuário</h2>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label><br />
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label><br />
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
  );
};

export default Cadastro;

