import Header from "../utilizavel/Header";
import "../../styles/Secretaria.css";
import { useNavigate } from "react-router-dom";
export default function InicioSecretaria() {

    const navigate = useNavigate();

    const CadastroOnibus = () => {
        navigate('/secretaria/onibus')
    }
    const CadastroIngressos = () => {
        navigate('/secretaria/reservas')
    }
    const CadastroUsuario = () => {
        navigate('/secretaria/usuarios')
    }
    const CadastroCoordenadores = () => {
        navigate('/secretaria/coordenadores')
    }
    const paroquias = () => {
        navigate('/secretaria/paroquias')
    }
    const viagens = () => {
        navigate('/secretaria/viagens')
    }
    
    return (
        <div className="container-secretaria">
            <Header which={"secretaria"} />
            <main>
        <h1>Secretária</h1>
        <div className="inicio">
          <div className="cards">
            <h3>Usuários</h3>
            <p>Aqui a Admistração poderá ver, editar, e outras funcionalidades</p>
            <button onClick={CadastroUsuario}>Ver Usuários</button>
          </div>
          <div className="cards">
            <h3>Ônibus</h3>
            <p>Aqui a Admistração poderá ver, editar, e outras funcionalidades</p>
            <button onClick={CadastroOnibus}> Ver Ônibus</button>
          </div>
          <div className="cards">
            <h3>Reservas</h3>
            <p>Aqui a Admistração poderá ver, editar, e outras funcionalidades</p>
            <button onClick={CadastroIngressos}>Ver Ingressos</button>
          </div>
          <div className="cards">
            <h3>Viagens</h3>
            <p>Aqui a Admistração poderá ver, editar, e outras funcionalidades</p>
            <button onClick={viagens}>Ver Viagens</button>
          </div>
          <div className="cards">
            <h3>Coordenadores</h3>
            <p>Aqui a Admistração poderá ver, editar, e outras funcionalidades</p>
            <button onClick={CadastroCoordenadores}> Ver Coordenadores</button>
          </div>
          <div className="cards">
            <h3>Paróquias</h3>
            <p>Aqui a Admistração poderá ver, todos os pagamentos dos ingressos</p>
            <button onClick={paroquias}>Paróquias</button>
          </div>
          
        </div>
      </main>
        </div>
    );
}