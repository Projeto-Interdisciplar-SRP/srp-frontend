import React, { useEffect, useState } from "react";
import Header from "../utilizavel/Header";
import Footer from "../utilizavel/Footer";

import "../../styles/inicio_usuario.css";
import logoSrp from "../../img/SRP Viagens.png";
import logoSol from "../../img/Sun.png";
import banner from "../../img/banner-paroquia.png";
import next from "../../img/Forward.png";
import back from "../../img/Back.png";
//IMAGENS DO CARROSEL
import img1 from "../../img/imagem onibus 1.png";
import img2 from "../../img/onibus 1.png";
import img3 from "../../img/onibus imagem 1.png";
const images = [img1, img2, img3];
import valor1 from "../../img/Us Dollar Circled.png";
import valor2 from "../../img/Christian Cross.png";
import valor3 from "../../img/Shield.png";


export default function InicioUsuario() {
    const [current, setCurrent] = useState(1); // Começa na imagem do meio (índice 1)
    const handleNext = () => {
      setCurrent((prev) => (prev + 1) % images.length);
    };
    const handlePrev = () => {
      setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };
    return(

        <div className="container">

            <Header which="usuario" page="inicio" />

            <div className="banner">
        <img src={banner} alt="Profile"></img>
        <div className="dados-viagem">
          <h1>Sua Viagem mais prática e segura</h1>
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
                className={`carousel-image ${
                  index === current ? "active" : ""
                }`}
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
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sap.
          </p>
        </div>
        <div className="valores-div">
          <img src={valor2} alt="" />
          <h3>Lorem isum</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sap.
          </p>
        </div>
        <div className="valores-div">
          <img src={valor3} alt="" />
          <h3>Lorem isum</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sap.
          </p>
        </div>
      </div>
      <Footer />

        </div>

    )

}