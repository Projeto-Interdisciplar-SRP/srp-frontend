// src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/Perfil.css';
import Header from './utilizavel/Header';
import Footer from './utilizavel/Footer';
import imgprofile from '../img/perfil.png';
import imgIngresso from '../img/image 2.png';
import logoSrp from '../img/SRP Viagens.png';
import logoSol from '../img/Sun.png';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../componentes/Auth";
import env from "/env.js";

const Profile = () => {

  const navigate = useNavigate();
  const usuario = useAuth(); // Obtém os dados do usuário logado
  const [usuarioData, setUsuarioData] = useState(usuario);

  const [reservas, setReservas] = useState([]);
  const [ingressos, setIngressos] = useState([]);


  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${env.url.local}/user/edit/${usuario?.id}`);
      const user = response.data;

      // Atualiza o estado de 'usuarioData' com as informações do usuário
      setUsuarioData(user);
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário:", error);
    }
  };

  useEffect(() => {
    if (usuario?.id) {
      fetchUserData(); // Recarrega os dados do usuário sempre que o 'usuario.id' mudar
    }
  }, [usuario?.id]);



  const handleCancel = () => {
    navigate("/perfil/cancelamento");
  };
  const handleDeleteReservation = async (reservaId) => {
    // Exibe o SweetAlert de confirmação antes de excluir
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: "Esta ação não pode ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    });
  
    // Se o usuário confirmar a exclusão
    if (result.isConfirmed) {
      try {
        await fetch(env.url.local + `/reservation/delete/${reservaId}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Erro ao excluir a reserva');
        } 

        setIngressos(ingressos.filter((reserva) => reserva.id !== reservaId));

        // Exibe o SweetAlert de sucesso
      
        Swal.fire(
          'Erro!',
          'Ocorreu um erro ao excluir a reserva.',
          'error'
        );
        setModalDelete(false);
        fetchAllReservations(); // Atualiza as reservas
  
      } catch (error) {
        // Exibe o SweetAlert de erro caso algo dê errado
        Swal.fire(
          'Excluído!',
          'Sua reserva foi excluída.',
          'success'
        );
        window.location.reload();
       
        console.error("Erro ao excluir a reserva:", err);
        
      }
    }
  };
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch(env.url.local + `/reservation/user/${usuario?.id}`,{
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true,
        },
        });
        const result = await response.json();
  
        if (!result.data) {
          console.error("Dados ausentes na resposta:", result);
          return;
        }
  
        // Mapear os dados de reservas para incluir as informações necessárias
        const reservasCompletas = result.data.map((reserva) => ({
          ...reserva,
          ticket:{
            quantidade: reserva.quantidade,
            preco: reserva.precoUnitario,
          },
          travel: {
            paroquia: {
              nome: reserva.localNome,
              bairro: reserva.localBairro,
              cidade: reserva.localCidade,
              rua: reserva.localRua,
            },
            onibus: {
              numero: reserva.busNumero,
              placa: reserva.busPlacaOnibus,
            },
            lugar: {
              nome: reserva.placeDestino, // Ou 'placeIda' dependendo de como você deseja exibir
              precoUnitario: reserva.placePrecoUnitario,
            },
            dataPartida: new Date(reserva.placeIda).toLocaleString(), // ou 'placeVolta' se preferir
          },
        }));
  
        setIngressos(reservasCompletas);
      } catch (err) {
        console.error("Erro ao buscar reservas:", err);
      }
    };
  
    fetchReservas();
  }, [usuario?.id]);

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
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${env.url.local}/user/edit/${usuario?.id}`);
        const user = response.data;
        // Atualize o estado de 'usuario' aqui, se necessário
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    };
  
    if (usuario?.id) {
      fetchUserData();
    }
  }, [usuario?.id]);
  return (
    <div className="container">
      <Header which='usuario' />
      <div className="profile">
        <div className="profile-img-info">
          <div className="img-profile">
            <img src={imgprofile} alt="Profile" />
          </div>
          <div className="profile-info">
            <h2>{usuarioData?.nome}</h2>
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
  {ingressos.length > 0 ? (
    ingressos.map((reserva, index) => (
      <div className="ticket" key={index}>
        <div className="ticket-info">
          <p><strong></strong> {usuario?.nome}</p>
          <p><strong>Quantidade:</strong> {reserva.quantidade}</p> 
          <p><strong>Preço:</strong> R$ {reserva.preco.toFixed(2)}</p>
          <p><strong>Paróquia:</strong> {reserva.localNome}</p>
          <p><strong>Ônibus:</strong> {reserva.busNumero}</p>
          <p><strong>Local:</strong> {reserva.placeDestino}</p>
          <p><strong>Data e Hora da Partida:</strong> {new Date(reserva.dataPartida).toLocaleString()}</p>
        </div>
        <div className="img-ingresso">
        <img src={imgIngresso} alt="" />
        <div className="cancel-btn">
        <button onClick={() => handleDeleteReservation(reserva.id)}>
          Cancelamento
        </button>
        </div>
        </div>
      </div>
    ))
  ) : (
    <h4>Você não possui ingressos reservados no momento. <a href="/pagamento">Clique aqui</a></h4>
  )}
</div>

<Footer />
    </div>
  );
};

export default Profile;
