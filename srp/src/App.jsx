// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/componentes/Auth';
import Login from '../src/componentes/Login';
import Cadastro from '../src/componentes/Cadastro';
import Cancelamento from '../src/componentes/Cancelamento';
import Profile from '../src/componentes/Perfil';
import Welcome from "../src/componentes/Welcome";
import Inicio from '../src/componentes/Inicio'; 
// import IngressoVenda from '../src/componentes/Venda'; 
// import ProfileEditar from '../src/componentes/EditarPerfil';

import '../src/styles/Auth.css'; // Importa o CSS compartilhado

const App = () => {

  return (
    <Router>
      <Routes>
        
        {/*ROTA AUTENTICADA (PRECISA ESTAR AUTENTICADO)*/}
        <Route path="/inicio" element={
          <AuthProvider>{/*QUANDO VOCE VER ESSE <AuthProvider> QUER DIZER QUE PRECISA ESTAR AUTENTICADO..*/}
            <Inicio/>
          </AuthProvider> 
        } />

        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Profile/>} />
        <Route path="/perfil/cancelamento" element={<Cancelamento />} />
      </Routes>
    </Router>
  );

};

export default App;
