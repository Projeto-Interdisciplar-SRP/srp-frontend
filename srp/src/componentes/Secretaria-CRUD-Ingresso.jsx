import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Ingressos.css"; // Estilos para o novo componente
import { useNavigate } from "react-router-dom";

const ListarIngressos = () => {
  const navigate = useNavigate();
  const [ingressos, setIngressos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // UseEffect para buscar os dados da API
  useEffect(() => {
    const fetchIngressos = async () => {
      try {
        const response = await axios.get("https://2a41-2804-7f0-a218-110c-d037-c4c4-613-19c5.ngrok-free.app/");
        
        // Verifique se a resposta contém os dados esperados
        if (Array.isArray(response.data)) {
          setIngressos(response.data); // Supondo que a resposta seja um array de ingressos
        } else {
          throw new Error("Dados recebidos não são um array.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar ingressos:", err);
        setError("Erro ao carregar ingressos");
        setLoading(false);
      }
    };

    fetchIngressos();
  }, []);

  const handleEdit = (id) => {
    navigate(`/secretaria/editaringresso/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://2a41-2804-7f0-a218-110c-d037-c4c4-613-19c5.ngrok-free.app/${id}`);
      setIngressos(ingressos.filter((ingresso) => ingresso.id !== id));
    } catch (err) {
      console.error("Erro ao excluir ingresso:", err);
      alert("Erro ao excluir ingresso.");
    }
  };

  if (loading) {
    return <p>Carregando ingressos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Filtrar ingressos com base na pesquisa
  const filteredIngressos = ingressos.filter((ingresso) => {
    const searchLower = search.toLowerCase();
    return (
      ingresso.titulo.toLowerCase().includes(searchLower) ||
      ingresso.destinoFinal.toLowerCase().includes(searchLower) ||
      ingresso.dataIda.toLowerCase().includes(searchLower) || // Se dataIda for uma string, use toLowerCase
      ingresso.preco.toString().includes(searchLower) // Converte preço para string
    );
  });

  return (
    <div className="container">
      <div className="ingressos-container">
  <h1>Ingressos Cadastrados</h1>
  <div className="pesquisa">
    <input
      type="text"
      placeholder="Pesquisar por título, destino, data ou preço"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
</div>
      <div className="ingressos-container">
        {filteredIngressos.length > 0 ? (
          filteredIngressos.map((ingresso) => (
            <div key={ingresso.id} className="card-ingresso">
              <h3>{ingresso.titulo}</h3>
              <p><strong>Destino Final:</strong> {ingresso.destinoFinal}</p>
              <p><strong>Data de Ida:</strong> {ingresso.dataIda}</p>
              <p><strong>Horário de Ida:</strong> {ingresso.horarioIda}</p>
              <p><strong>Data de Volta:</strong> {ingresso.dataVolta}</p>
              <p><strong>Horário de Volta:</strong> {ingresso.horarioVolta}</p>
              <p><strong>Preço:</strong> R${ingresso.preco}</p>
              <div className="card-buttons">
                <button onClick={() => handleEdit(ingresso.id)} className="edit-btn">Editar</button>
                <button onClick={() => handleDelete(ingresso.id)} className="delete-btn">Excluir</button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum ingresso cadastrado.</p>
        )}
      </div>
    </div>
  );
};

export default ListarIngressos;
