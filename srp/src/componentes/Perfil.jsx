  // src/components/Profile.jsx
  import React, { useEffect, useState } from 'react';
  import Swal from 'sweetalert2';
  import '../styles/Perfil.css';
  import Header from './utilizavel/Header';
  import imgprofile from '../img/perfil.png';
  import imgIngresso from '../img/image 2.png';
  import logoSrp from '../img/SRP Viagens.png';
  import logoSol from '../img/Sun.png';
  import { useNavigate, Link } from 'react-router-dom'; 
  import { useAuth } from "../componentes/Auth";

  const Profile = () => {

    const userRole = "usuario";
    const navigate = useNavigate();
    const usuario = useAuth(); // Obtém os dados do usuário logado

    // Função para redirecionar para a página de cancelamento
    const handleCancel = () => {
      navigate("/perfil/cancelamento");
    };

    // Função para realizar logout
    const handleLogout = () => {
      Swal.fire({
        title: "Sucesso!",
        text: "Você Deslogou",
        icon: "success",
        confirmButtonText: "Ok",
      });
      localStorage.removeItem("usuario"); // Remove dados do usuário
      navigate("/login"); // Redireciona para a página de login
    };

    if (!usuario) {
      // Caso o usuário não esteja autenticado, redirecione para o login
      navigate("/login");
      return null; // Evita renderizar o restante do componente
    }

    return (
      <div className="container">
        <Header which={userRole} />
        <div className="profile">
          <div className="profile-img-info">
            <div className="img-profile">
              <img src={imgprofile} alt="Profile" />
            </div>
            <div className="profile-info">
              <h2>{usuario?.nome}</h2>
              <p>{usuario?.email}</p>
            </div>
          </div>
          <div className="btn">
            <Link to="/perfil/editar">
            <button className="edit-btn">Editar</button>
            </Link>
          
          <button className="back-btn" onClick={handleLogout}>Sair</button>
          </div>
        </div>

        <div className="tickets-section">
          <h3>Ingressos:</h3>
          <div className="ticket">
            <div className="ticket-info">
              <p><strong>{usuario?.nome}</strong></p>
              <p>Local de Embarque: Paróquia São Benedito</p>
              <p>Local de Chegada: Aparecida do Norte</p>
              <p>Data: 10/10/2024</p>
              <p>Horário: 13:30 até as 22:00</p>
            </div>
            <div className="img-ingresso">
              <img src={imgIngresso} alt="Ingresso" />
            </div>
            <button className="cancel-btn" onClick={handleCancel}>Cancelamento</button>
          </div>
        </div>
      </div>
    );
  };

  export default Profile;
