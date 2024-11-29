import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Importando SweetAlert2
import Header from './utilizavel/Header';
import '../styles/Pagamento.css';
import env from '/env.js';
import { useAuth } from "../componentes/Auth";


const CheckoutPage = () => {

  const userRole = "usuario";
  const usuario = useAuth();


  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [termos, setTermos] = useState(false);
  const [paroquia, setParoquias] = useState([]);
  const [destino, setDestino] = useState([]);
  const [selectedDestino, setSelectedDestino] = useState([]);
  const [selectedParoquia, setSelectedParoquia] = useState('');
  const [selectedParoquiaNome, setSelectedParoquiaNome] = useState('');
  const [selectedDestinoNome, setSelectedDestinoNome] = useState('');
  const [loading, setLoading] = useState(false);

  const [ida, setIda] = useState(null);
  const [volta, setVolta] = useState(null);

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

  async function fetchAllDestino() {
    setLoading(true);
    try {
      const response = await fetch(env.url.local + '/place/', {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (Array.isArray(data.data)) {
        setDestino(data.data);
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
    fetchAllDestino();
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
              value={usuario?.nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder=''
            />

            <label>Celular</label>
            <input
              type="tel"
              value={usuario?.telefone}
              onChange={(e) => setCelular(e.target.value)}
              placeholder="(11) 95674-3367"
            />

            <label>Email</label>
            <input
              type="email"
              value={usuario?.email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
            />

            <label>CPF</label>
            <input
              type="text"
              value={usuario?.cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="000.000.000-00"
            />
          </form>
        </div>

        {/* Opções de Pagamento */}
        <div className="card">
          <h3>Forma de pagamento</h3>
          <select>
            <option value="None">Selecione uma forma de pagamento</option>
            <option value="pix">Pix</option>
            <option value="cartao">Cartão de Crédito</option>
          </select>
        </div>
        <div className="confirm-section">
          <div className="termos">
            <input
              type="checkbox"
              id="terms"
              checked={termos}
              onChange={() => setTermos(!termos)}
            />
            <p htmlFor="terms">Eu li e concordo com os termos de uso</p>
          </div>

          <button className="confirm-button" onClick={handleConfirmarPagamento}>
            Confirmar e pagar
          </button>
          <p>Ambiente seguro para compra</p>
        </div>
      </div>

      {/* Seção à Direita */}
      <div className="right-section">
        {/* Detalhes da Viagem */}
        <div className="card">
          <div className="selects">
            <label htmlFor="">Qual Paróquia Deseja Embarcar?</label>
            <select
              name="selectParoquia"
              id="select"
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
          </div>
          <div className="selects">

            <label htmlFor="">Qual Destino Deseja Ir?</label>
            <select
              name="selectDestino"
              id="selectDestino"
              value={selectedDestino}
              onChange={(e) => {
                const selectedId = e.target.value;
                setSelectedDestino(selectedId);

                // Busque o objeto do destino correspondente pelo ID
                const selectedDestinoObj = destino.find((d) => d.id === selectedId);

                if (selectedDestinoObj) {
                  setSelectedDestinoNome(selectedDestinoObj.destino);
                  // Atualize as datas de ida e volta
                  setIda(new Date(selectedDestinoObj.ida));
                  setVolta(new Date(selectedDestinoObj.volta));
                }
              }}
            >
              <option value="none">Selecione...</option>
              {destino.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.destino}
                </option>
              ))}
            </select>
          </div>
          <h3>Embarque</h3>
          <p>{selectedParoquiaNome || 'Nenhuma paróquia selecionada'}</p>
          <p className='data'>{ida
            ? ida.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
            : 'Data de ida não disponível'}</p>

          <h3>Destino</h3>
          <p>{selectedDestinoNome || 'Nenhum Destino Selecionado'}</p>
          <p className='data'>{volta
            ? volta.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
            : 'Data de ida não disponível'}</p>
          <p>R$ 70,00</p>
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

      </div>
    </div>
  );
};

export default CheckoutPage;
