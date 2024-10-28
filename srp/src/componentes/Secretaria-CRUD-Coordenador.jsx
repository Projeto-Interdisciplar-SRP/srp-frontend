import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoSrp from '../img/SRP Viagens.png';
import logoSol from '../img/Sun.png';
import '../styles/Secretaria.css';

const Secretaria = () => {
  const navigate = useNavigate();
  const [coordenadores, setCoordenadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // UseEffect para carregar os dados dos coordenadores do JSON ao carregar o componente
  useEffect(() => {
    const fetchCoordenadores = async () => {
      try {
        const response = await fetch('../src/serve/coordenadores.json'); // Ajuste o caminho se necessário
        if (!response.ok) {
          throw new Error('Erro ao carregar coordenadores');
        }
        const data = await response.json();
        setCoordenadores(data); // Armazena os coordenadores no estado
      } catch (err) {
        console.error('Erro ao carregar coordenadores:', err);
        setError('Erro ao carregar coordenadores');
      } finally {
        setLoading(false);
      }
    };

    fetchCoordenadores();
  }, []);

  const handleEdit = (id) => {
    navigate(`/secretaria/crudcoordenador/editarcoordenador/${id}`);
  };

  const handleDelete = (id) => {
    setCoordenadores(coordenadores.filter(coordenador => coordenador.id !== id));
  };

  const handleCadCoordenador = () => {
    navigate('/secretaria/cadcoordenador');
  };

  const handleCadOnibus = () => {
    navigate('/secretaria/cadonibus');
  };

  const handleRelatorio = () => {
    navigate('/secretaria/relatorio');
  };

  const handleCadIngresso = () => {
    navigate('/secretaria/cadingresso');
  };

  const handleVoltar = () => {
    navigate('/secretaria');
  };

  if (loading) {
    return <p>Carregando coordenadores...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Filtro baseado na pesquisa do nome ou função
  const filteredCoordenadores = coordenadores.filter((coordenador) =>
    coordenador.nome.toLowerCase().includes(search.toLowerCase()) ||
    coordenador.funcao.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header-secre">
        <div className="logo">
          <img src={logoSol} alt="Logo Sol" />
          <img src={logoSrp} alt="Logo SRP" />
        </div>
        <ul className="menu">
          <li onClick={handleCadCoordenador}>Cadastrar Coordenador</li>
          <li onClick={handleCadOnibus}>Cadastrar Ônibus</li>
          <li onClick={handleCadIngresso}>Cadastrar Ingresso</li>
          <li onClick={handleRelatorio}>Relatórios</li>
        </ul>
      </header>

      <main>
        <div className="title-back">
          <h1>Secretária</h1>
          <button onClick={handleVoltar} className="link-secretaria">
            Voltar
          </button>
        </div>
        <div className="pesquisa">
          <input
            type="text"
            placeholder="Pesquisar por nome do motorista"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="coordenadores">
          {filteredCoordenadores.length > 0 ? (
            filteredCoordenadores.map((coordenador) => (
              <div key={coordenador.id} className="card-coordenador">
                <h3>{coordenador.nome}</h3>
                <p><strong>Email:</strong> {coordenador.email}</p>
                <p><strong>Função:</strong> {coordenador.funcao}</p>
                <div className="card-buttons">
                  <button onClick={() => handleEdit(coordenador.id)} className="edit-btn">Editar</button>
                  <button onClick={() => handleDelete(coordenador.id)} className="delete-btn">Excluir</button>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum coordenador cadastrado.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Secretaria;
