
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/Login.css';     
import logoSol from "../img/Sun (1).png";

const Login = ({ setUsuario }) => {  // Recebe setUsuario como prop
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
  
    // Verifica se o email e a senha são do admin
    if (email === 'adm123@gmail.com' && senha === 'adm123@') {
      setUsuario({ email }); // Armazena os dados do usuário (você pode armazenar mais dados, se necessário)
      Swal.fire({
        title: 'Sucesso!',
        text: 'Login Feito com Sucesso',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      navigate('/secretaria'); // Redireciona para a página da secretaria
      return;
    }
  
    try {
      const response = await fetch('https://f856-2804-7f0-a218-1d49-d1b1-bb20-c3c7-4cd0.ngrok-free.app/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });
  
      // Verifica se a resposta não foi bem sucedida
      if (!response.ok) {
        const errorResponse = await response.json(); // Captura a resposta de erro
        setMensagem(errorResponse.message || 'Erro ao fazer login'); // Mostra mensagem de erro
        setCarregando(false);
        return;
      }
  
      const userData = await response.json();
      setUsuario(userData); // Armazena os dados do usuário
      Swal.fire({
        title: 'Sucesso!',
        text: 'Login Feito com Sucesso',
        icon: 'success',
        confirmButtonText: 'Ok'
      }); 
      navigate('/'); // Redireciona para o perfil após o login
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
        <form onSubmit={handleSubmit} className='form-login'>
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
