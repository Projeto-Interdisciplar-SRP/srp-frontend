import React, { useContext, createContext, useState } from "react";

// Cria o AuthContext
const AuthContext = createContext(null);

// Hook para fornecer acesso ao contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Componente Provider que encapsula a lógica de login
export const AuthProvider = ({ children }) => {
  const [logado, setLogado] = useState(false); // Estado de autenticação

  // Função para login
  const login = () => {
    setLogado(true); // Atualiza o estado para logado
  };

  // Função para logout
  const logout = () => {
    setLogado(false); // Atualiza o estado para deslogado
  };

  return (
    <AuthContext.Provider value={{ logado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
