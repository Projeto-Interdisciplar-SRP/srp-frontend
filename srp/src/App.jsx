// src/App.jsx
import React, { useState } from 'react';
import Login from '../src/componentes/Login';
import Cadastro from '../src/componentes/Cadastro';
import './App.css';
import '../src/styles/AuthForm.css'; 

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      {isLogin ? (
        <Login onToggle={toggleForm} />
      ) : (
        <Cadastro onToggle={toggleForm} />
      )}
    </div>
  );
};

export default App;
