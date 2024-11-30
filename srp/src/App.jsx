import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './componentes/Auth';


// Telas do Usuario
import Login from './componentes/Login';
import Cadastro from './componentes/Cadastro';
import Cancelamento from './componentes/Cancelamento';
import Profile from './componentes/Perfil';
import EditarPerfil from './componentes/EditarPerfil.jsx';
import Inicio from './componentes/Inicio';

import OnibusCoordenador from './componentes/coordenador/visao/OnibusCoordenador';
import ReservaCoordenador from './componentes/coordenador/visao/ReservaCoordenador';

import CadastroCoordenador from './componentes/coordenador/CadastroCoordenador';
import ConfirmarCoordenador from './componentes/coordenador/ConfirmarCoordenador';
import DetalhesCoordenador from './componentes/coordenador/DetalhesCoordenador';
import ListarCoodenador from './componentes/coordenador/ListaCoordenador';
import EditarCoordenador from './componentes/coordenador/EditarCoordenador';

import Sobre from "./componentes/Sobre.jsx";
import Ajuda from "./componentes/Ajuda.jsx";

import Welcome from "./componentes/Welcome";

//Telas Secretaria


import PessoaCoordenador from './componentes/coordenador/visao/PessoaCoordenador.jsx';
import CadastroOnibus from './componentes/onibus/CadastroOnibus';
import ListarOnibus from './componentes/onibus/CadastroOnibus';
import EditarOnibus from './componentes/onibus/EditarOnibus';
import DetalhesOnibus from './componentes/onibus/DetalhesOnibus';




import Pagamento from './componentes/Pagamento.jsx'

import Paróquia from './componentes/paroquias/Paróquias';


import RelatórioPagamento from './componentes/secretaria/RelatórioPagamento.jsx'



// SECRETARIA
import OnibusSecretaria from './componentes/secretaria/visao/OnibusSecretaria.jsx';
import CoordenadorSecretaria from './componentes/secretaria/visao/CoodenadorSecretaria.jsx';
import ListarViagem from './componentes/secretaria/visao/ViagemSecretaria.jsx';
import CadastroViagem from './componentes/viagem/CadastroViagem';
import Secretaria from './componentes/secretaria/InicioSecretaria';
import PessoasSecretaria from './componentes/secretaria/visao/PessoaSecretaria.jsx';
import ReservaSecretaria from './componentes/secretaria/visao/ReservaSecretaria.jsx';


const App = () => {

  return (
    <Router>
      <Routes>
      
          <Route path="/" element={<Welcome/>}/>

          {/*ROTA AUTENTICADA (PRECISA ESTAR AUTENTICADO)*/}
          {/*QUANDO VOCE VER ESSE <AuthProvider> QUER DIZER QUE PRECISA ESTAR AUTENTICADO..*/}
          <Route path="/inicio" element={<AuthProvider> <Inicio /> </AuthProvider>}/>          
          <Route path="/perfil" element={<AuthProvider> <Profile /> </AuthProvider>}/>          
          <Route path="/perfil/editar" element={<AuthProvider> <EditarPerfil /> </AuthProvider>}/>          
          <Route path="/perfil/cancelamento"element={<AuthProvider> <Cancelamento /> </AuthProvider>}/>

          <Route path="/login" element={<Login/>}/>
          
          <Route path="/cadastro" element={<Cadastro />} />
          
          <Route path="/cadastro/coordenador" element={<CadastroCoordenador />} />

          <Route path="/sobre" element={<Sobre />} />
          <Route path="/ajuda" element={<Ajuda />} />

          <Route path='/coordenador/onibus' element={<AuthProvider> <OnibusCoordenador /> </AuthProvider>}/>
          <Route path='/adm/onibus' element={<AuthProvider> <OnibusCoordenador /> </AuthProvider>}/>
          <Route path='/coordenador/reservas' element={<AuthProvider> <ReservaCoordenador /> </AuthProvider>}/>

          <Route path='/secretaria/onibus' element={<AuthProvider> <OnibusSecretaria/> </AuthProvider>}/>
          <Route path='/secretaria/coordenadores' element={<AuthProvider> <CoordenadorSecretaria/> </AuthProvider>}/>
          
          <Route path="/secretaria/cadastro/coordenador" element={<CadastroCoordenador />} />
          <Route path="/confirmar/cadastro/coordenador" element={<ConfirmarCoordenador />} />
          
          <Route path="/secretaria/listar/coordenadores" element={ <ListarCoodenador /> } />
          <Route path="/secretaria/listar/coordenador/detalhes" element={ <DetalhesCoordenador /> } />
          <Route path="/secretaria/listar/coordenador/editar" element={ <EditarCoordenador /> } />

          <Route path="/secretaria" element={<AuthProvider> <Secretaria /> </AuthProvider>} />

          <Route path="/secretaria/cadastro/onibus" element={ <CadastroOnibus /> } />
          <Route path="/secretaria/listar/onibus" element={ <ListarOnibus /> } />
          <Route path="/secretaria/listar/onibus/detalhes" element={ <DetalhesOnibus /> } />
          <Route path="/secretaria/listar/onibus/editar" element={ <EditarOnibus /> } />

          <Route path="/secretaria/cadastro/viagem" element={ <CadastroViagem /> } />
          <Route path="/secretaria/viagens" element={ <ListarViagem /> } />
          <Route path="/secretaria/paroquias" element={ <Paróquia /> } />
          <Route path="/secretaria/usuarios" element={ <PessoasSecretaria /> } />
          <Route path="/secretaria/reservas" element={ <ReservaSecretaria /> } />
          <Route path='/secretaria/onibus' element={<AuthProvider> <OnibusSecretaria /> </AuthProvider>}/>

          <Route path="/pagamento" element={<AuthProvider> <Pagamento /> </AuthProvider>} />
          <Route path="/cancelamento" element={ <Cancelamento /> } />
          <Route path="/relatorio" element={ <RelatórioPagamento /> } />

          
          
      </Routes>
    </Router>
  );

};

export default App;
