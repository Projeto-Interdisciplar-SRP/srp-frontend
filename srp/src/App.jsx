// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../src/componentes/Auth';
// Telas do Usuario
import Login from '../src/componentes/Login';
import Cadastro from '../src/componentes/Cadastro';
import Cancelamento from '../src/componentes/Cancelamento';
import Profile from '../src/componentes/Perfil';
import SobreDesenvolvedores from '../src/componentes/Sobre-Desenvolvedores'
import Inicio from '../src/componentes/Inicio';

// Telas da Secretaria e dos Coordenadores
import Secretaria from '../src/componentes/Secretaria';
import SecretariaCoordenador from '../src/componentes/Secretaria-CadastroCoordenador';
import CRUDCoordenador from '../src/componentes/Secretaria-CRUD-Coordenador';
import CRUDOnibus from '../src/componentes/Secretaria-CRUD-Onubis';
import CRUDIngresso from '../src/componentes/Secretaria-CRUD-Ingresso';
import EditarIngresso from '../src/componentes/EditarIngresso';
import EditarCoordenador from '../src/componentes/EditarCoordenador';
import EditarOnibus from '../src/componentes/EditarOnibus';
import SecretariaIngresso from '../src/componentes/Secretaria-CadastroIngresso';
import SecretariaOnibus from '../src/componentes/Secretaria-CadastroOnibus';
import SecretariaRelatorio from '../src/componentes/Secretaria-Relatorio';


import './App.css';
import '../src/styles/Auth.css'; // Importa o CSS compartilhado


const App = () => {
  const [usuario, setUsuario] = useState(null); // Estado para armazenar o usuário




    return (
      <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/secretaria" element={<Secretaria />} />

          <Route path="/secretaria/cadcoordenador" element={<SecretariaCoordenador />} />
          <Route path="/secretaria/crudcoordenador" element={<CRUDCoordenador />} />
          <Route path="/secretaria/crudcoordenador/editarcoordenador/:id" element={<EditarCoordenador />} />

          <Route path="/secretaria/cadonibus" element={<SecretariaOnibus />} />
          <Route path="/secretaria/crudonibus" element={<CRUDOnibus />} />
          <Route path="/secretaria/editaronibus/:id" element={<EditarOnibus />} />

          <Route path="/secretaria/relatorio" element={<SecretariaRelatorio />} />

          <Route path="/secretaria/cadingresso" element={<SecretariaIngresso />} />
          <Route path="/secretaria/crudingresso" element={<CRUDIngresso />} />
          <Route path="/secretaria/editaringresso/:id" element={<EditarIngresso />} />
          
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
