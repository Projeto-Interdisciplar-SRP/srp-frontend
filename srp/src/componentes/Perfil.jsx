// src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import '../styles/Perfil.css';
// import api from '../serve/api';
import imgprofile from '../img/perfil.png'
import imgIngresso from '../img/image 2.png'
import logoSrp from '../img/SRP Viagens.png'
import logoSol from '../img/Sun.png'
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({ nome: '', email: '' });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/auth/profile');
        setUser({
          nome: response.data.nome,
          email: response.data.email,
        });
      } catch (error) {
        console.error(error);
        alert('Erro ao buscar os dados do perfil.');
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    
<div class="container">
  <header>
    <div className="logo">
    <img src={logoSol} alt="Profile"></img>
    <img src={logoSrp} alt="Profile"></img>
    </div>
    <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="">Sobre</a></li>
        <li><a href="">Viagem</a></li>
        <li><a href="">Cancelamento</a></li>
        <li><a href="">Ajuda</a></li>
    </ul>
  </header>
        <div class="profile">
          <div className="profile-img-info">
          <div className="img-profile">
            <img src={imgprofile} alt="Profile"></img>
            </div>
            <div class="profile-info">
                <h2>ISAÍAS B. DE SOUZA</h2>
                <p>isaias@gmail.com</p>
            </div>
            </div>
            <button class="edit-btn">Editar</button>
        </div>

        <div class="tickets-section">
            <h3>Ingressos:</h3>
            <div class="ticket">
                <div class="ticket-info">
                    <p><strong>ISAÍAS B. DE SOUZA</strong></p>
                    <p>Local de Embarque: Paróquia São Benedito</p>
                    <p>Local de Chegada: Aparecida do Norte</p>
                    <p>Data: 10/10/2024</p>
                    <p>Horário: 13:30 até as 22:00</p>
                </div>
                <div class="img-ingresso">
                    <img src={imgIngresso} alt="aparecida"></img>
                </div>
                <button class="cancel-btn">Cancelamento</button>
            </div>
            
        </div>
    </div>

  );
};

export default Profile;
