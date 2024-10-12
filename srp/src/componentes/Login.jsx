// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css';     
import '../styles/Global.css';     
import logoSol from "../img/Sun (1).png";

const Login = (onLogin ) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [logado, setLogado] = useState(false);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificação de campos obrigatórios
    if (!email || !senha) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }

    const dadosLogin = { email, senha };
    setCarregando(true);
    setMensagem('');

    try {
      const resposta = await axios.post('https://3ae1-2804-7f0-a218-882-882d-1902-6573-abe1.ngrok-free.app/auth', dadosLogin);
      setMensagem(resposta.data.message);
      setLogado(true);
      // Opcional: Armazenar token ou dados do usuário no localStorage
      // localStorage.setItem('token', resposta.data.token);
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

  // Função para Logout
  const handleLogout = () => {
    setLogado(false);
    setMensagem('Logout realizado com sucesso.');
    // Opcional: Remover token ou dados do usuário do localStorage
    // localStorage.removeItem('token');
  };

  // Retorno do JSX
  return (
    <div className="auth-container">
      <div className='form-container'>
        <div className="top">
          <div className="logo-form">
            <img src={logoSol} alt="Logo" />
          </div>
          <h2>Login</h2>
        </div>
        {mensagem && <p className="mensagem">{mensagem}</p>}
        {!logado ? (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="usuario@exemplo.com"
              />
            </div>
            <div className="input-group">
              <label>Senha:</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                placeholder="Sua senha"
              />
            </div>
            <button type="submit" disabled={carregando}>
              {carregando ? 'Entrando...' : 'Login'}
            </button>
          </form>
        ) : (
          <div className="welcome-container">
            <h2>Bem-vindo!</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
