// src/components/Login.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../serve/api';
import '../styles/Auth.css';

const Login = ({ onToggle, onLoginSuccess }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

   const onLogin = async (data) => {
    const { email, senha } = data;
    try {
      const response = await api.login(email, senha);
      localStorage.setItem('token', response.token);
      alert('Login bem-sucedido!');
      reset();
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onLogin)}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email é obrigatório.',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Formato de email inválido.'
              }
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="input-group">
          <label>Senha:</label>
          <input
            type="password"
            {...register('senha', {
              required: 'Senha é obrigatória.',
              minLength: {
                value: 6,
                message: 'A senha deve ter pelo menos 6 caracteres.'
              }
            })}
          />
          {errors.senha && <p className="error">{errors.senha.message}</p>}
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>
        Não tem uma conta?{' '}
        <button className="toggle-button" onClick={onToggle}>
          Cadastre-se
        </button>
      </p>
    </div>
  );
};

export default Login;
