// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../src/componentes/Login';
import Cadastro from '../src/componentes/Cadastro';
import Cancelamento from '../src/componentes/Cancelamento';
import Profile from '../src/componentes/Perfil';
import Inicio from '../src/componentes/Inicio';
import './App.css';
import '../src/styles/Auth.css'; // Importa o CSS compartilhado

const App = () => {
  const [usuario, setUsuario] = useState(null);

  const handleLogin = (dadosUsuario) => {
    setUsuario(dadosUsuario);
  };

  const handleLogout = () => {
    setUsuario(null);
  };

  return (
     <>
           {!usuario ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Profile usuario={usuario} onLogout={handleLogout} />
      )}

     </>
  );
};

export default App;
