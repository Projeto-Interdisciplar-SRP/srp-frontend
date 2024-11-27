import Header from "../utilizavel/Header";
import "../../styles/Secretaria.css";
import { useNavigate } from "react-router-dom";
export default function InicioSecretaria() {

    const navigate = useNavigate();

    const CadastroOnibus = () => {
        navigate('/adm/onibus')
    }
    const CadastroIngressos = () => {
        navigate('/secretaria/listar/ingressos')
    }
    const CadastroCoordenadores = () => {
        navigate('/secretaria/listar/coordenador')
    }
    const paroquias = () => {
        navigate('/paroquias')
    }
    
    return (
        <div className="container-secretaria">
            <Header which={"secretaria"} />
            <main>
        <h1>Secretária</h1>
        <div className="inicio">
          <div className="cards">
            <h3>Coordenadores</h3>
            <p>Aqui a Admistração poderá ver, editar, e outras funcionalidades</p>
            <button onClick={CadastroCoordenadores}>Ver Coordenadores</button>
          </div>
          <div className="cards">
            <h3>Ônibus</h3>
            <p>Aqui a Admistração poderá ver, editar, e outras funcionalidades</p>
            <button onClick={CadastroOnibus}> Ver Ônibus</button>
          </div>
          <div className="cards">
            <h3>Ingresso</h3>
            <p>Aqui a Admistração poderá ver, editar, e outras funcionalidades</p>
            <button onClick={CadastroIngressos}>Ver Ingressos</button>
          </div>
          <div className="cards">
            <h3>Viagens</h3>
            <p>Aqui a Admistração poderá ver, editar, e outras funcionalidades</p>
            <button onClick={CadastroIngressos}>Relatório</button>
          </div>
          <div className="cards">
            <h3>Relatório de Vendas</h3>
            <p>Aqui a Admistração poderá ver, todos os pagamentos dos ingressos</p>
            <button onClick={CadastroIngressos}>Relatório</button>
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