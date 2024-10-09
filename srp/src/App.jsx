// src/App.jsx
import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from '../src/componentes/Login';
// import Cadastro from '../src/componentes/Cadastro';
import Profile from '../src/componentes/Perfil';
import Inicio from '../src/componentes/Inicio';
import './App.css';
import '../src/styles/Auth.css'; // Importa o CSS compartilhado

const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  // const handleLoginSuccess = () => {
  //   setIsAuthenticated(true);
  // };

  // const PrivateRoute = ({ children }) => {
  //   return isAuthenticated ? children : <Navigate to="/login" />;
  // };

  return (
    <>
      <Inicio />
    </>
    // <Router>
    //   <div className="app-container">
    //     <Routes>
    //       <Route path="/login" element={
    //         isAuthenticated ? <Navigate to="/profile" /> : <Login onLoginSuccess={handleLoginSuccess} />
    //       } />
    //       <Route path="/cadastro" element={
    //         isAuthenticated ? <Navigate to="/profile" /> : <Cadastro />
    //       } />
    //       <Route path="/profile" element={
    //         <PrivateRoute>
    //           <Profile />
    //         </PrivateRoute>
    //       } />
    //       <Route path="*" element={<Navigate to="/login" />} />
    //     </Routes>
    //   </div>
    // </Router>
  );
};

export default App;
