// src/components/Cadastro.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Auth.css';     
import '../styles/Global.css';     
import logoSol from "../img/Sun (1).png";

const Cadastro = () => {
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

  // Função para buscar endereço pelo CEP
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

  // Função para lidar com a mudança no campo CEP
  const handleCepChange = (e) => {
    const valorCep = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    setCep(valorCep);
    if (valorCep.length === 8) { // CEP no formato brasileiro possui 8 dígitos
      buscarEndereco(valorCep);
    } else {
      setRua('');
      setBairro('');
      setCidade('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificação de campos obrigatórios
    if (!nome || !email || !senha || !cep || !rua || !bairro || !cidade || !cpf || !rg || !telefone) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }

    const dadosUsuario = { 
      nome, 
      email, 
      senha, 
      cep, 
      rua, 
      bairro, 
      cidade, 
      cpf, 
      rg, 
      telefone 
    };
    setCarregando(true);
    setMensagem('');

    try {
      const resposta = await axios.post('https://3ae1-2804-7f0-a218-882-882d-1902-6573-abe1.ngrok-free.app/user/register', dadosUsuario); // URL relativa com proxy
      setMensagem(resposta.data.message);
      // Resetar os campos
      setNome('');
      setEmail('');
      setSenha('');
      setCep('');
      setRua('');
      setBairro('');
      setCidade('');
      setCpf('');
      setRg('');
      setTelefone('');
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
        {mensagem && <p className="mensagem">{mensagem}</p>}
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
          <div className="input-group">
            <label>CEP:</label>
            <input
              type="text"
              value={cep}
              onChange={handleCepChange}
              maxLength="8"
              required
              placeholder="Apenas números"
            />
          </div>
          <div className="input-group">
            <label>Rua:</label>
            <input
              type="text"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              required
              readOnly={rua !== ''}
            />
          </div>
          <div className="input-group">
            <label>Bairro:</label>
            <input
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              required
              readOnly={bairro !== ''}
            />
          </div>
          <div className="input-group">
            <label>Cidade:</label>
            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              required
              readOnly={cidade !== ''}
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
              placeholder="Apenas números"
            />
          </div>
          <div className="input-group">
            <label>RG:</label>
            <input
              type="text"
              value={rg}
              onChange={(e) => setRg(e.target.value)}
              required
              maxLength="9"
              placeholder="Apenas números"
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
              placeholder="Apenas números"
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
