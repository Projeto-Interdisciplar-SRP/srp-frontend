import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirecionamento
import { useAuth  } from "../componentes/Auth";
import "../styles/Perfil.css";
import "../styles/Inicio.css";
import logoSrp from "../img/SRP Viagens.png";
import logoSol from "../img/Sun.png";
import banner from "../img/banner-paroquia.png";
import next from "../img/Forward.png";
import back from "../img/Back.png";
import img1 from "../img/imagem onibus 1.png";
import img2 from "../img/onibus 1.png";
import img3 from "../img/onibus imagem 1.png";
import valor1 from "../img/Us Dollar Circled.png";
import valor2 from "../img/Christian Cross.png";
import valor3 from "../img/Shield.png";

const images = [img1, img2, img3];

const Inicio = () => {
  const [current, setCurrent] = useState(1); // Começa na imagem do meio
  const navigate = useNavigate(); // Para navegação
  const { logado, login } = useAuth();

  
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight / 2, // A metade da altura da janela
      behavior: "smooth", // Faz a rolagem suave
    });
  };

  // Redirecionar para as páginas de login, cadastro e perfil
  const handleLoginRedirect = () => {
    navigate("/login");
    login(); 
  };

  const handleCadastroRedirect = () => {
    navigate("/cadastro");
  };

  const handlePerfilRedirect = () => {
    navigate("/perfil"); 
  };

  return (
    <div className="container">
      <header>
        <div className="logo">
          <img src={logoSol} alt="Profile" />
          <img src={logoSrp} alt="Profile" />
        </div>
        <ul>
          <li>
            <a onClick={handleScroll}>Inicio</a>
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
        <div className="login-cadastro">
          {logado ? (
            <>
              <button type="button" onClick={handlePerfilRedirect}>Perfil</button>
            </>
          ) : (
            <>
              <button type="button" onClick={handleLoginRedirect}>Entrar</button>
              <button type="button" className="cadastro" onClick={handleCadastroRedirect}>Cadastro</button>
            </>
          )}
        </div>
      </header>

      <div className="banner">
        <img src={banner} alt="Profile" />
        <div className="dados-viagem">
          <h1>Sua Viagem mais prática e segura</h1>
          <form action="" method="get">
            <input type="text" className="input-img1" placeholder="Cidade de origem" />
            <input type="text" className="input-img2 che" placeholder="Aparecida do Norte" disabled />
            <input type="date" className="input-img3" placeholder="Ida" disabled />
            <input type="date" className="input-img4" placeholder="Volta" disabled />
          </form>
        </div>
      </div>

      <div className="valores-viagens">
        <h1>Valor das passagens nas cidades de origem</h1>
        <div className="origens">
          <div className="origem">
            <p>Onibus saindo de </p>
            <h3>São Pedro</h3>
            <p>Valor: R$50,00</p>
          </div>
          <div className="origem">
            <p>Onibus saindo de </p>
            <h3>São Pedro</h3>
            <p>Valor: R$50,00</p>
          </div>
          <div className="origem">
            <p>Onibus saindo de </p>
            <h3>São Pedro</h3>
            <p>Valor: R$50,00</p>
          </div>
        </div>
      </div>

      <div className="carrosel">
        <h1>Viaje Com Segurança, Preço Justo e Fiel</h1>
        <div className="carousel-container">
          <button className="prev-btn" onClick={handlePrev}>
            <img src={back} alt="" />
          </button>
          <div className="carousel-slide">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index}`}
                className={`carousel-image ${index === current ? "active" : ""}`}
              />
            ))}
          </div>
          <button className="next-btn" onClick={handleNext}>
            <img src={next} alt="" />
          </button>
        </div>
      </div>

      <div className="valores">
        <div className="valores-div">
          <img src={valor1} alt="" />
          <h3>Lorem isum</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.</p>
        </div>
        <div className="valores-div">
          <img src={valor2} alt="" />
          <h3>Lorem isum</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.</p>
        </div>
        <div className="valores-div">
          <img src={valor3} alt="" />
          <h3>Lorem isum</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.</p>
        </div>
       
      </div>

      <footer></footer>

    </div>
  );
};

export default Inicio;
