// src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import '../styles/Perfil.css';
import api from '../serve/api';

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
    <div className="profile-container">
      <h2>Meu Perfil</h2>
      <div className="profile-info">
        <p><strong>Nome:</strong> {user.nome}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
