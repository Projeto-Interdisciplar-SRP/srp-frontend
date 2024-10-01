import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/AuthForm.css';
import img_bus from "../img/bus.png"

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    reset();
  };

  const onLogin = (data) => {
    const { email, senha } = data;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === email && user.senha === senha);

    if (user) {
      alert(`Bem-vindo, ${user.nome}!`);
      // Aqui você pode redirecionar o usuário ou armazenar o estado de autenticação
    } else {
      alert('Email ou senha inválidos.');
    }
  };

  const onRegister = (data) => {
    const { nome, email, senha } = data;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(user => user.email === email);

    if (userExists) {
      alert('Usuário já cadastrado com este email.');
    } else {
      users.push({ nome, email, senha });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Cadastro realizado com sucesso! Você pode fazer login agora.');
      setIsLogin(true);
      reset();
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <div className="logo_busao">
            <img src={img_bus} alt="" />
        </div>
        <h2>{isLogin ? 'Login' : 'Cadastro'}</h2>
        <form onSubmit={handleSubmit(isLogin ? onLogin : onRegister)}>
          {!isLogin && (
            <div className="input-group">
              <label>Nome:</label>
              <input
              placeholder='Digite seu Nome'
                type="text"
                {...register('nome', { required: 'Nome é obrigatório.' })}
              />
              {errors.nome && <p className="error">{errors.nome.message}</p>}
            </div>
          )}
          <div className="input-group">
            <label>Email:</label>
            <input
            placeholder='Digite seu Email'
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
          <button type="submit">{isLogin ? 'Entrar' : 'Cadastrar'}</button>
        </form>
        <p>
          {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
          <span className="toggle-link" onClick={toggleForm}>
            {isLogin ? 'Cadastre-se' : 'Faça Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
