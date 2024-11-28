import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Importando SweetAlert2
import Header from './utilizavel/Header';
import '../styles/Pagamento.css';
import env from '/env.js';

const CheckoutPage = () => {
  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [termos, setTermos] = useState(false);
  const [paroquia, setParoquias] = useState([]);
  const [selectedParoquia, setSelectedParoquia] = useState('');
  const [selectedParoquiaNome, setSelectedParoquiaNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [singleReservation, setSingleReservation] = useState({
    userId: '', // ID do usuário logado
    quantidade: 1, // Quantidade de passagens
    preco: 100, // Preço total
    pagamentoStatus: 'pendente', // Status inicial do pagamento
    localId: '', // ID da paróquia
    busId: '1', // ID do ônibus (ajuste conforme necessário)
    dataPartida: '2024-10-10T07:00:00' // Data de partida
});

const handleConfirmarPagamento = async () => {
  if (!termos) {
      Swal.fire({
          icon: 'warning',
          title: 'Atenção',
          text: 'Você precisa concordar com os termos de uso antes de confirmar o pagamento.',
      });
      return;
  }

  const newReservation = {
      ticket: {
          id_usuario: singleReservation.userId, // Substitua pelo ID real do usuário
          quantidade: singleReservation.quantidade,
          preco: singleReservation.preco,
          status: 'confirmado',
      },
      travel: {
          id_paroquia: selectedParoquia,
          id_onibus: singleReservation.busId,
          data_partida: singleReservation.dataPartida,
      },
  };

  try {
      const response = await fetch(env.url.local + '/reservation/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReservation),
      });

      if (response.ok) {
          Swal.fire({
              icon: 'success',
              title: 'Pagamento Confirmado',
              text: `Paróquia selecionada: ${selectedParoquiaNome || 'Nenhuma paróquia selecionada'}`,
          });
          // Adicione qualquer lógica adicional, como navegação ou limpeza de formulário
      } else {
          throw new Error('Erro ao confirmar a reserva');
      }
  } catch (error) {
      console.error(error);
      Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível confirmar sua reserva. Tente novamente mais tarde.',
      });
  }
};


  async function fetchAllParoquias() {
    setLoading(true);
    try {
      const response = await fetch(env.url.local + '/local/', {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (Array.isArray(data.data)) {
        setParoquias(data.data);
      } else {
        console.error('A resposta não é um array válido', data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar as paróquias:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível carregar as paróquias. Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllParoquias();
  }, []);


  return (
    <div className="container">
      <Header which="usuario" />
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
          <label htmlFor="">Selecione a paróquia</label>
          <select
            name="selectParoquia"
            id="selectParoquia"
            value={selectedParoquia}
            onChange={(e) => {
              const selectedId = e.target.value;
              setSelectedParoquia(selectedId);

              // Busque o nome correspondente pelo ID
              const selectedParoquiaObj = paroquia.find((p) => p.id === selectedId);
              setSelectedParoquiaNome(selectedParoquiaObj ? selectedParoquiaObj.nome : '');
            }}
          >
            <option value="none">Selecione...</option>
            {paroquia.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
          <h3>Viagem de ida</h3>
          <p>Paróquia selecionada: {selectedParoquiaNome || 'Nenhuma paróquia selecionada'}</p>
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
          <div className="termos">
            <input
            type="checkbox"
            id="terms"
            checked={termos}
            onChange={() => setTermos(!termos)}
          />
          <label htmlFor="terms">Eu li e concordo com os termos de uso</label>
          </div>
          
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
