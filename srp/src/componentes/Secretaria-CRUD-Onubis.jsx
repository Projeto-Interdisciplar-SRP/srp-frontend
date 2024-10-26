import React, { useState, useEffect } from "react";
import "../styles/Secretaria.css"; // Certifique-se de que o CSS atualizado esteja vinculado corretamente
import logoSrp from '../img/SRP Viagens.png';
import logoSol from '../img/Sun.png';
import { useNavigate } from 'react-router-dom';

const ListaOnibus = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [onibus, setOnibus] = useState([]); // Estado para armazenar os ônibus
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UseEffect para buscar os dados dos ônibus
  useEffect(() => {
    const fetchOnibus = async () => {
      try {
        const response = await fetch('../src/serve/onibus.json'); // Ajuste o caminho se necessário
        if (!response.ok) {
          throw new Error('Erro ao carregar ônibus');
        }
        const data = await response.json();
        setOnibus(data); // Armazena os ônibus no estado
      } catch (err) {
        console.error('Erro ao carregar ônibus:', err);
        setError('Erro ao carregar ônibus');
      } finally {
        setLoading(false);
      }
    };

    fetchOnibus();
  }, []);

  // Filtrar os ônibus com base na pesquisa do nome do motorista
  const filteredOnibus = onibus.filter((bus) =>
    bus.motorista.nome.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    // Aqui você pode implementar a lógica para excluir um ônibus, como enviar um pedido para uma API
    console.log("Excluir ônibus com ID:", id);
    // Remover o ônibus da lista (apenas exemplo)
    setOnibus(onibus.filter(bus => bus.id !== id));
  };

  const handleEdit = (id) => {
    console.log("Editar ônibus com ID:", id);
    navigate(`/secretaria/editaronibus/${id}`); // Navegar para a página de edição
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
    return <div>Carregando...</div>; // Mensagem de carregamento
  }

  if (error) {
    return <div>{error}</div>; // Mensagem de erro
  }

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
          <h1>Secretaria</h1>
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

        <div className="lista-onibus">
          {filteredOnibus.map((bus) => (
            <div key={bus.id} className="card-onibus">
              <h3>{bus.motorista.nome}</h3>
              <p>Placa: {bus.placa}</p>
              <p>Marca: {bus.marca}</p>
              <div className="card-buttons">
                <button onClick={() => handleEdit(bus.id)} className="edit-btn">Editar</button>
                <button onClick={() => handleDelete(bus.id)} className="delete-btn">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ListaOnibus;
