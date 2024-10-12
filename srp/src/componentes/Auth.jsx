// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Criação do Contexto
export const AuthContext = createContext();

// Provedor do Contexto
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  // Função de Login
  const login = async (email, senha) => {
    try {
      const resposta = await axios.post('https://3ae1-2804-7f0-a218-882-882d-1902-6573-abe1.ngrok-free.app/auth ', { email, senha });
      // Supondo que a resposta contenha um token e dados do usuário
      const { token, usuario } = resposta.data;
      setToken(token);
      setUsuario(usuario);
      // Armazenar o token no localStorage para persistência
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      return { sucesso: true };
    } catch (error) {
      console.error('Erro no login:', error);
      return { sucesso: false, mensagem: error.response?.data?.message || 'Erro ao realizar login.' };
    }
  };

  // Função de Logout
  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  };

  // Carregar estado de autenticação do localStorage ao iniciar
  useEffect(() => {
    const tokenArmazenado = localStorage.getItem('token');
    const usuarioArmazenado = localStorage.getItem('usuario');
    if (tokenArmazenado && usuarioArmazenado) {
      setToken(tokenArmazenado);
      setUsuario(JSON.parse(usuarioArmazenado));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
