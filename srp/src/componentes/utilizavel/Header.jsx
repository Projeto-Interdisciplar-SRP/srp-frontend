import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/header.css";
import logoSrp from "../../img/SRP Viagens.png";
import logoSol from "../../img/Sun.png";

export default function Header({ which }) {
  const navigate = useNavigate();

  function logOut() {
    localStorage.clear();
    navigate("/");
  }

  const mobile_menu = (
    <div className="">
      <ul className="navLink" id="navBar">
        <li className="linkSelect">
          <a href="/inicio" className="link">
            Pessoas
          </a>
        </li>
        <li className="linkSelect">
          <a href="#section2" className="link">
            Ônibus
          </a>
        </li>
        <li className="linkSelect">
          <a href="#section3" className="link">
            Reservas
          </a>
        </li>
        <li className="linkSelect">
          <a href="#section3" className="link">
            Sobre
          </a>
        </li>
        <li className="linkSelect">
          <a href="#section3" className="link">
            Sobre
          </a>
        </li>
        <li className="linkSelect">
          <a onClick={logOut} className="link">
            Sair
          </a>
        </li>
      </ul>
    </div>
  );

  switch (which) {

    case "usuario":
      return (
        <header>
          <div className="logo">
            <img src={logoSol} alt="Profile"></img>
            <img src={logoSrp} alt="Profile"></img>
          </div>
          <ul>
            <li>
              <a href="/">Inicio</a>
            </li>
            <li>
              <a href="">Sobre</a>
            </li>
            <li>
              <a href="">Viagem</a>
            </li>
            <li>
              <a href="">Cancelamento</a>
            </li>
            <li>
              <a href="">Ajuda</a>
            </li>
          </ul>
          <div className="entrar-perfil">
            <Link to="/perfil">
            <button type="button">Perfil</button>
            </Link>
            
            
            
          </div>
        </header>
      );

    case "coordenador":
      return (
        <nav className="navBarWrapper" id="navBarWrapper">
          <div className="logoWrapper">
            <div className="logo">SRP</div>
          </div>
          <div className="menuIconWrapper" id="menuIconWrapper"></div>
          <ul className="navLink" id="navBar">
            <li className="linkSelect">
              <a href="/inicio" className="link">
                Pessoas
              </a>
            </li>
            <li className="linkSelect">
              <a href="/coordenador/onibus" className="link">
                Ônibus
              </a>
            </li>
            <li className="linkSelect">
              <a href="/coordenador/reservas" className="link">
                Reservas
              </a>
            </li>
            <li className="linkSelect">
              <a href="/sobre" className="link">
                Sobre
              </a>
            </li>
            <li className="linkSelect">
              <a onClick={logOut} className="link">
                Sair
              </a>
            </li>
          </ul>
        </nav>
      );

    case "secretaria":
      return (
        <nav className="navBarWrapper" id="navBarWrapper">
          <div className="logoWrapper">
            <div className="logo">SRP</div>
          </div>
          <div className="menuIconWrapper" id="menuIconWrapper"></div>
          <ul className="navLink" id="navBar">

            <li className="linkSelect">
              <a href="/inicio" className="link">
                Inicio
              </a>
            </li>

            <li className="linkSelect">
              <a href="/secretaria/onibus" className="link">
                Onibus
              </a>
            </li>

            <li className="linkSelect">
              <a href="/secretaria/cadastro/onibus" className="link">
                Cadastrar Onibus
              </a>
            </li>

            <li className="linkSelect">
              <a href="/secretaria/cadastro/onibus" className="link">
                Cadastrar Onibus
              </a>
            </li>

            <li className="linkSelect">
              <a href="/secretaria/cadastro/coordenador" className="link">
                Cadastrar Viajem
              </a>
            </li>

            <li className="linkSelect">
              <a onClick={logOut} className="link">
                Sair
              </a>

            </li>
          </ul>
        </nav>
      );

    default:
      return (
        <h6>SELECIONE O props "which" para saber que header é o utilizado</h6>
      );
  }
}
