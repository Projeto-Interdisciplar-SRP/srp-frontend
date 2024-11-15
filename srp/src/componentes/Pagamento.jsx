import React, { useState } from 'react';
import '../styles/Pagamento.css';

const CheckoutPage = () => {
  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [termos, setTermos] = useState(false);

  const handleConfirmarPagamento = () => {
    if (!termos) {
      alert('Você precisa concordar com os termos de uso.');
    } else {
      alert('Pagamento confirmado!');
      // Aqui você pode adicionar a lógica para envio dos dados
    }
  };

  return (
    <div className="container">
      {/* Seção à Esquerda */}
      <div className="left-section">
        {/* Formulário de Dados do Passageiro */}
        <div className="card">
          <h3>Dados do passageiro</h3>
          <form>
            <label>Nome completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome completo"
            />

            <label>Celular</label>
            <input
              type="tel"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              placeholder="(11) 95674-3367"
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
            />

            <label>CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="000.000.000-00"
            />
          </form>
          <button className="add-passenger">Adicionar passageiro</button>
          <p className="info">Crianças também precisam ser incluídas como passageiros</p>
        </div>

        {/* Opções de Pagamento */}
        <div className="card">
          <h3>Forma de pagamento</h3>
          <ul>
            <li>Pagar com Pix</li>
            <li>Pagar com cartão</li>
            <li>Pagar com boleto</li>
          </ul>
        </div>
      </div>

      {/* Seção à Direita */}
      <div className="right-section">
        {/* Detalhes da Viagem */}
        <div className="card">
          <h3>Viagem de ida</h3>
          <p>São Pedro, 07:00</p>
          <p>10 de outubro, 07:00</p>
          <p>R$ 50,00</p>

          <h3>Viagem de volta</h3>
          <p>Aparecida, 19:00</p>
          <p>10 de outubro, 19:00</p>
          <p>R$ 50,00</p>
        </div>

        {/* Extrato */}
        <div className="card">
          <h3>Extrato</h3>
          <div>
            <p>Extrato ida: R$ 50,00</p>
            <p>Extrato volta: R$ 50,00</p>
            <p>Total a pagar: R$ 100,00</p>
          </div>
        </div>

        {/* Confirmação e Termos de Uso */}
        <div className="confirm-section">
          <input
            type="checkbox"
            id="terms"
            checked={termos}
            onChange={() => setTermos(!termos)}
          />
          <label htmlFor="terms">Eu li e concordo com os termos de uso</label>
          <button className="confirm-button" onClick={handleConfirmarPagamento}>
            Confirmar e pagar
          </button>
          <p>Ambiente seguro para compra</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
