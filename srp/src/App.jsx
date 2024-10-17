// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../src/componentes/Auth';
import Login from '../src/componentes/Login';
import Cadastro from '../src/componentes/Cadastro';
import Cancelamento from '../src/componentes/Cancelamento';
import Profile from '../src/componentes/Perfil';
// import ProfileEditar from '../src/componentes/EditarPerfil';
import Inicio from '../src/componentes/Inicio'; 
// import IngressoVenda from '../src/componentes/Venda'; 

import './App.css';
import '../src/styles/Auth.css'; // Importa o CSS compartilhado

const App = () => {
  const [usuario, setUsuario] = useState(null); // Estado para armazenar o usuário

  // const handleLogin = (userData) => {
  //   setUsuario(userData); // Define os dados do usuário ao fazer login
  // };

  // const handleLogout = () => {
  //   setUsuario(null); // Limpa os dados do usuário ao fazer logout
  // };


  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login setUsuario={setUsuario}/>} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Profile usuario={usuario}/>} />
        <Route path="/perfil/cancelamento" element={<Cancelamento />} />
      </Routes>
    </Router>
  </AuthProvider>
  );
};

export default App;
