// src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import '../styles/Perfil.css';
import api from '../serve/api';
import imgprofile from '../img/Male User.png'
import qrcode from '../img/qrcode.jpeg'

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
                <div class="qr-code">
                    <img src={qrcode} alt="qrcode"></img>
                    <span class="ticket-quantity">x2</span>
                </div>
            </div>
            <button class="cancel-btn">Cancelamento</button>
        </div>
    </div>

  );
};

export default Profile;
