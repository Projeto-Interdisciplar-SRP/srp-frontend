// src/components/Login.jsx
import React from "react";
import { useForm } from "react-hook-form";
// import api from '../serve/api';
import "../styles/Auth.css";
import logoSol from "../img/Sun (1).png";

const Login = ({ onToggle, onLoginSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onLogin = async (data) => {
    const { email, senha } = data;
    try {
      const response = await api.post("https://b826-179-119-58-114.ngrok-free.app/auth/login", { email, senha });
      const token = response.data.token;
      // Armazenar o token no Local Storage ou em outro local seguro
      localStorage.setItem("token", token);
      alert("Login bem-sucedido!");
      reset();
      if (onLoginSuccess) {
        onLoginSuccess(); // Função para redirecionar ou atualizar o estado
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert("Erro ao fazer login.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <div className="top">
          <div className="logo-form">
            <img src={logoSol} alt="Profile"></img>
          </div>
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit(onLogin)}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              {...register("email", {
                required: "Email é obrigatório.",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Formato de email inválido.",
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="input-group">
            <label>Senha:</label>
            <input
              type="password"
              {...register("senha", {
                required: "Senha é obrigatória.",
                minLength: {
                  value: 6,
                  message: "A senha deve ter pelo menos 6 caracteres.",
                },
              })}
            />
            {errors.senha && <p className="error">{errors.senha.message}</p>}
          </div>
          <button type="submit">Entrar</button>
        </form>
        <p>
          Não tem uma conta?{" "}
          <button className="toggle-button" onClick={onToggle}>
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
