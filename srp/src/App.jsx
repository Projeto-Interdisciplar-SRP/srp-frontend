// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

import Welcome from "../src/componentes/Welcome";
import Inicio from '../src/componentes/Inicio'; 
// import IngressoVenda from '../src/componentes/Venda'; 
// import ProfileEditar from '../src/componentes/EditarPerfil';


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
