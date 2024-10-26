
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';     
import logoSol from "../img/Sun (1).png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate(); // Para navegação

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem(''); // Limpa mensagens anteriores
    setCarregando(true); // Inicia o estado de carregamento

    // Verificação de campos obrigatórios
    if (!email || !senha) {
      setMensagem('Por favor, preencha todos os campos.');
      setCarregando(false);
      return;
    }

    try {
      
      const fetched = await fetch(' https://c272-2804-7f0-a218-1d49-82a-b45-1706-6fc1.ngrok-free.app/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const response = await fetched.json();

      // Verifica se a resposta não foi bem sucedida
      if (response.status == false) {
        
        setMensagem(response.message || 'Erro ao fazer login'); // Mostra mensagem de erro
        setCarregando(false);
        return;

      }else{

        localStorage.setItem('usuario', JSON.stringify(response.data)) // Armazena os dados do usuário no localstorage
        navigate('/inicio'); // Redireciona para o perfil após o login

      }

    } catch (error) {
      console.error('Erro:', error);
      setMensagem('Login falhou. Tente novamente.'); // Alerta para falha no login
      setCarregando(false);
    }

  };

  // Função para navegar até a página de cadastro
  const handleCadastroRedirect = () => {
    navigate('/cadastro');
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
            <div className="cadastro">
          <p>Não possui conta? Clique abaixo </p>
          <button type="button" onClick={handleCadastroRedirect} className="cadastro-btn">
            Ir para Cadastro
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
