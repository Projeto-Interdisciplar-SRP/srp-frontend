// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './componentes/Auth';
// Telas do Usuario
import Login from './componentes/Login';
import Cadastro from './componentes/Cadastro';
import Cancelamento from './componentes/Cancelamento';
import Profile from './componentes/Perfil';
import SobreDesenvolvedores from './componentes/Sobre-Desenvolvedores'
import Inicio from './componentes/Inicio';

// Telas da Secretaria e dos Coordenadores
import Secretaria from './componentes/Secretaria';
import SecretariaCoordenador from './componentes/Secretaria-CadastroCoordenador';
import CRUDCoordenador from './componentes/Secretaria-CRUD-Coordenador';
import CRUDOnibus from './componentes/Secretaria-CRUD-Onubis';
import CRUDIngresso from './componentes/Secretaria-CRUD-Ingresso';
import EditarIngresso from './componentes/EditarIngresso';
import EditarCoordenador from './componentes/EditarCoordenador';
import EditarOnibus from './componentes/EditarOnibus';
import SecretariaIngresso from './componentes/Secretaria-CadastroIngresso';
import SecretariaOnibus from './componentes/Secretaria-CadastroOnibus';
import SecretariaRelatorio from './componentes/Secretaria-Relatorio';
import CadastroCoordenador from './componentes/CadastroCoordenador';

import Welcome from "./componentes/Welcome";
// import IngressoVenda from './componentes/Venda'; 
// import ProfileEditar from './componentes/EditarPerfil';


import '../src/styles/Auth.css'; // Importa o CSS compartilhado



const App = () => {

  return (
    <Router>
      <Routes>
      
          <Route path="/" element={<Welcome/>}/>

          {/*ROTA AUTENTICADA (PRECISA ESTAR AUTENTICADO)*/}
          <Route path="/inicio" element={
            <AuthProvider>{/*QUANDO VOCE VER ESSE <AuthProvider> QUER DIZER QUE PRECISA ESTAR AUTENTICADO..*/}
              <Inicio/>
            </AuthProvider> 
          } />
          <Route path="/login" element={<Login/>}/>
          
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro/coordenador" element={<CadastroCoordenador />} />
          <Route path="/perfil" element={<Profile/>} />
          <Route path="/perfil/cancelamento" element={<Cancelamento />} />
          
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
          
      </Routes>
    </Router>
  );

};

export default App;
