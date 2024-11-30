import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/EditarPerfil.css';
import logoSol from "../img/Sun (1).png";
import { useAuth } from "../componentes/Auth"; // Importando o hook useAuth
import env from '/env.js';

const EditarUsuario = () => {
  const usuario = useAuth(); //// Supondo que o ID do usuário seja salvo no estado do contexto
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
      const carregarDadosUsuario = async () => {
        try {
          const resposta = await axios.get(`${env.url.local}/user/${usuario?.id}`);
          const usuario = resposta.data;
          setNome(usuario?.nome);
          setEmail(usuario?.email);
          setCep(usuario?.cep);
          setRua(usuario?.rua);
          setBairro(usuario?.bairro);
          setCidade(usuario?.cidade);
          setCpf(usuario?.cpf);
          setRg(usuario?.rg);
          setTelefone(usuario?.telefone);
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
          setMensagem('Erro ao carregar dados do usuário.');
        }
      };
      carregarDadosUsuario();
    
  }, [usuario?.id]);

  const buscarEndereco = async (cep) => {
    try {
      const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (resposta.data.erro) {
        setMensagem('CEP não encontrado.');
        setRua('');
        setBairro('');
        setCidade('');
      } else {
        setRua(resposta.data.logradouro);
        setBairro(resposta.data.bairro);
        setCidade(resposta.data.localidade);
        setMensagem('');
      }
    } catch (error) {
      setMensagem('Erro ao buscar o CEP.');
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const handleCepChange = (e) => {
    const valorCep = e.target.value.replace(/\D/g, '');
    setCep(valorCep);
    if (valorCep.length === 8) {
      buscarEndereco(valorCep);
    } else {
      setRua('');
      setBairro('');
      setCidade('');
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!nome || !email || !senha || !cep || !rua || !bairro || !cidade || !cpf || !rg || !telefone) {
    setMensagem('Por favor, preencha todos os campos.');
    return;
  }

  const dadosAtualizados = {
    id: usuario?.id,
    nome,
    email,
    senha,
    rua,
    bairro,
    cidade,
    cep,
    cpf,
    rg,
    telefone,
  };

  setCarregando(true);
  setMensagem('');

  try {
    const resposta = await axios.put(`${env.url.local}/user/edit`, dadosAtualizados, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
      },
      mode: 'cors', // Definindo o modo como CORS
    });

    if (resposta.data.status) {
      Swal.fire({
        title: 'Sucesso!',
        text: 'Dados atualizados com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          // Atualiza o estado do usuário no contexto ou localStorage
          localStorage.setItem("usuario", JSON.stringify({ ...usuario, nome, email, telefone, etc })); // Atualize o usuário aqui
          navigate('/perfil'); // Redireciona para a página de perfil
        }
      });
    } else {
      setMensagem(resposta.data.message);
    }
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
  return (
    <div className="edit-container">
      <div className="top">
        <div className="logo-form">
          <img src={logoSol} alt="Profile" />
        </div>
        <h2>Editar Usuário</h2>
        <Link to="/perfil">
            <button>
                Voltar para o Perfil
            </button>
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
      <div className="input-login">
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
      </div>
        <div className="input-login">
        <div className="input-group">
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>CPF:</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
            maxLength="11"
          />
        </div>
        </div>
        <div className="input-login">
        <div className="input-group">
          <label>CEP:</label>
          <input
            type="text"
            value={cep}
            onChange={handleCepChange}
            maxLength="8"
            required
            placeholder="Somente números"
          />
        </div>
        
        <div className="input-group">
          <label>Rua:</label>
          <input
            type="text"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            required
          />
        </div>
        </div>
        <div className="input-login">
        <div className="input-group">
          <label>Bairro:</label>
          <input
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Cidade:</label>
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required
          />
        </div>
        </div> <div className="input-login">
        <div className="input-group">
          <label>RG:</label>
          <input
            type="text"
            value={rg}
            onChange={(e) => setRg(e.target.value)}
            required
            maxLength="9"
          />
        </div>
       
        <div className="input-group">
          <label>Telefone:</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
            maxLength="11"
          />
        </div>
        </div>
        <button type="submit" disabled={carregando} className="btn-editar">
          {carregando ? 'Salvando...' : 'Salvar Alterações'}
        </button>
        {mensagem && <p className="mensagem">{mensagem}</p>}
      </form>
    </div>
  );
};

export default EditarUsuario;
