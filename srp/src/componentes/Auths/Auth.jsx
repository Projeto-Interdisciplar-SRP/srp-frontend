import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [useDadosUsuario, setDadosUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLocalStorage = localStorage.getItem("usuario");

    if (usuarioLocalStorage) {
      const dados = JSON.parse(usuarioLocalStorage);

      if (dados.id) { // Certifica-se de que o ID está presente
        setDadosUsuario(dados);
      } else {
        console.error("ID do usuário não encontrado.");
        navigate("/login");
      }
      
    } else {
      navigate("/login");
    }

    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={useDadosUsuario}>
      {children}
    </AuthContext.Provider>
  );
};
