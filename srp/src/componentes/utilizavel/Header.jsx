import React, { useEffect } from "react";
import "../../styles/header.css";

export default function Header({ which, page }) {
  
  useEffect(() => {
    let navbar = document.getElementById('navBar');
    let navBarWrapper = document.getElementById('navBarWrapper');
    const menuIconWrapper = document.getElementById('menuIconWrapper');
    
    if (!navbar || !navBarWrapper || !menuIconWrapper) {
      console.error('Elementos necessários não encontrados no DOM');
      return;
    }
  
    let aux = 0;
  
    // Evento de clique fora da navbar para fechar o menu
    document.onclick = element => {
      if (element.target.id !== 'menuIconWrapper' && element.target.id !== 'navBar') {
        navbar.classList.remove('showMe');
        menuIconWrapper.classList.remove('active');
      }
    };
  
    // Evento de rolagem para esconder navbar
    window.addEventListener('scroll', () => {
      if (window.scrollY > aux) {
        navBarWrapper.classList.add('ocultar');
        navbar.classList.remove('showMe');
        menuIconWrapper.classList.remove('active');
      } else {
        navBarWrapper.classList.remove('ocultar');
      }
  
      aux = window.scrollY;
    });
  
    // Evento de clique no menu para alternar a classe
    menuIconWrapper.onclick = () => toggleEffect();
  
    // Adicionar evento para links
    document.querySelectorAll('.linkSelect').forEach(el => el.setAttribute('onclick', 'toggleEffect()'));
  
    function toggleEffect() {
      navbar.classList.toggle('showMe');
      menuIconWrapper.classList.toggle('active');
    }
  
  }, []);

  switch (which) {
    case 'usuario':
      return (
        <nav className="navBarWrapper" id="navBarWrapper">
          <div className="logoWrapper">
            <div className="logo">SRP</div>
          </div>
          <div className="menuIconWrapper" id="menuIconWrapper">
          </div>
          <ul className="navLink" id="navBar">
            <li className="linkSelect"><a href="#section1" className="link">Sección 1</a></li>
            <li className="linkSelect"><a href="#section2" className="link">Sección 2</a></li>
            <li className="linkSelect"><a href="#section3" className="link">Sección 3</a></li>
          </ul>
        </nav>
      );
    
    case 'coordenador':
      return (
        <nav className="navBarWrapper" id="navBarWrapper">
          <div className="logoWrapper">
            <div className="logo">SRP</div>
          </div>
          <div className="menuIconWrapper" id="menuIconWrapper">
          </div>
          <ul className="navLink" id="navBar">
            <li className="linkSelect"><a href="#section1" className="link">Pessoas</a></li>
            <li className="linkSelect"><a href="#section2" className="link">Ônibus</a></li>
            <li className="linkSelect"><a href="#section3" className="link">Reservas</a></li>
            <li className="linkSelect"><a href="#section3" className="link">Sobre</a></li>
          </ul>
        </nav>
      );

    case 'secretaria':
      return (
        <nav className="navBarWrapper" id="navBarWrapper">
          <div className="logoWrapper">
            <div className="logo">SRP</div>
          </div>
          <div className="menuIconWrapper" id="menuIconWrapper">
          </div>
          <ul className="navLink" id="navBar">
            <li className="linkSelect"><a href="#section1" className="link">Sección 1</a></li>
            <li className="linkSelect"><a href="#section2" className="link">Sección 2</a></li>
            <li className="linkSelect"><a href="#section3" className="link">Sección 3</a></li>
          </ul>
        </nav>
      );
    
    default:
      return (
        <nav className="navBarWrapper" id="navBarWrapper">
          <div className="logoWrapper">
            <div className="logo">SRP</div>
          </div>
          <div className="menuIconWrapper" id="menuIconWrapper">
          </div>
          <ul className="navLink" id="navBar">
            <li className="linkSelect"><a href="#section1" className="link">Sección 1</a></li>
            <li className="linkSelect"><a href="#section2" className="link">Sección 2</a></li>
            <li className="linkSelect"><a href="#section3" className="link">Sección 3</a></li>
          </ul>
        </nav>
      );
  }
}