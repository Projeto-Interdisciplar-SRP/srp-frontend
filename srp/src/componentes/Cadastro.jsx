// src/components/Cadastro.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/AuthForm.css';

const Cadastro = ({ onToggle }) => {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const [cepError, setCepError] = useState('');
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const onRegister = (data) => {
    const { nome, email, senha, cep, rua, bairro, cidade } = data;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(user => user.email === email);

    if (userExists) {
      alert('Usuário já cadastrado com este email.');
    } else {
      users.push({ nome, email, senha, cep, rua, bairro, cidade });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Cadastro realizado com sucesso! Você pode fazer login agora.');
      reset();
      onToggle(); // Alterna para o formulário de Login após cadastro
    }
  };

  const handleCepChange = async (e) => {
    const cep = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length !== 8) {
      setCepError('CEP deve ter 8 dígitos.');
      setValue('rua', '');
      setValue('bairro', '');
      setValue('cidade', '');
      return;
    }

    setIsLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setCepError('CEP não encontrado.');
        setValue('rua', '');
        setValue('bairro', '');
        setValue('cidade', '');
      } else {
        setCepError('');
        setValue('rua', data.logradouro || '');
        setValue('bairro', data.bairro || '');
        setValue('cidade', data.localidade || '');
      }
    } catch (error) {
      setCepError('Erro ao buscar o CEP.');
      setValue('rua', '');
      setValue('bairro', '');
      setValue('cidade', '');
      console.error(error);
    } finally {
      setIsLoadingCep(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit(onRegister)}>
        <div className="input-group">
          <label>Nome:</label>
          <input
            type="text"
            {...register('nome', { required: 'Nome é obrigatório.' })}
          />
          {errors.nome && <p className="error">{errors.nome.message}</p>}
        </div>
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
        <div className="input-group">
          <label>CEP:</label>
          <input
            type="text"
            maxLength="8"
            {...register('cep', {
              required: 'CEP é obrigatório.',
              pattern: {
                value: /^[0-9]{8}$/,
                message: 'CEP deve conter 8 dígitos numéricos.'
              }
            })}
            onBlur={handleCepChange}
          />
          {errors.cep && <p className="error">{errors.cep.message}</p>}
          {cepError && <p className="error">{cepError}</p>}
          {isLoadingCep && <p className="loading">Buscando CEP...</p>}
        </div>
        <div className="input-group">
          <label>Rua:</label>
          <input
            type="text"
            {...register('rua', { required: 'Rua é obrigatória.' })}
            readOnly
          />
          {errors.rua && <p className="error">{errors.rua.message}</p>}
        </div>
        <div className="input-group">
          <label>Bairro:</label>
          <input
            type="text"
            {...register('bairro', { required: 'Bairro é obrigatória.' })}
            readOnly
          />
          {errors.bairro && <p className="error">{errors.bairro.message}</p>}
        </div>
        <div className="input-group">
          <label>Cidade:</label>
          <input
            type="text"
            {...register('cidade', { required: 'Cidade é obrigatória.' })}
            readOnly
          />
          {errors.cidade && <p className="error">{errors.cidade.message}</p>}
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <p>
        Já tem uma conta?{' '}
        <button className="toggle-button" onClick={onToggle}>
          Faça Login
        </button>
      </p>
    </div>
  );
};

export default Cadastro;
