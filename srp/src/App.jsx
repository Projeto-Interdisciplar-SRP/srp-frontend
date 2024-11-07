// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './componentes/Auth';

// Telas do Usuario
import Login from './componentes/Login';
import Cadastro from './componentes/Cadastro';
import Cancelamento from './componentes/Cancelamento';
import Profile from './componentes/Perfil';
import Inicio from './componentes/Inicio';

import CadastroCoordenador from './componentes/coordenador/CadastroCoordenador';
import ConfirmarCoordenador from './componentes/coordenador/ConfirmarCoordenador';

import Welcome from "./componentes/Welcome";

const App = () => {

  return (
    <Router>
      <Routes>
      
          <Route path="/" element={<Welcome/>}/>

          {/*ROTA AUTENTICADA (PRECISA ESTAR AUTENTICADO)*/}
          {/*QUANDO VOCE VER ESSE <AuthProvider> QUER DIZER QUE PRECISA ESTAR AUTENTICADO..*/}
          <Route path="/inicio" element={<AuthProvider> <Inicio /> </AuthProvider>}/>          
          <Route path="/perfil" element={<AuthProvider> <Profile /> </AuthProvider>}/>          
          <Route path="/perfil/cancelamento"element={<AuthProvider> <Cancelamento /> </AuthProvider>}/>

          <Route path="/login" element={<Login/>}/>
          
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro/coordenador" element={<CadastroCoordenador />} />
          <Route path="/confirmar/cadastro/coordenador" element={<ConfirmarCoordenador />} />
          
      </Routes>
    </Router>
  );

};

export default App;
