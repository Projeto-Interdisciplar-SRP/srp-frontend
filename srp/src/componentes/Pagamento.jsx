import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Importando SweetAlert2
import Header from './utilizavel/Header';
import '../styles/Pagamento.css';
import env from '/env.js';
import { useAuth } from "../componentes/Auth";
import { useNavigate } from 'react-router-dom';
const CheckoutPage = () => {
  const usuario = useAuth();
  const navigate = useNavigate();
  const [termos, setTermos] = useState(false);
  const [paroquia, setParoquias] = useState([]);
  const [destino, setDestino] = useState([]);
  const [selectedParoquia, setSelectedParoquia] = useState('');
  const [selectedParoquiaNome, setSelectedParoquiaNome] = useState('');
  const [selectedDestino, setSelectedDestino] = useState('');
  const [selectedDestinoNome, setSelectedDestinoNome] = useState('');
  const [selectedDestinoPreco, setSelectedDestinoPreco] = useState('');
  const [selectedDestinoId, setSelectedDestinoId] = useState('');
  const [selectedBusId, setSelectedBusId] = useState('');
  const [bus, setBus] = useState([]);
  const [ida, setIda] = useState(null);
  const [volta, setVolta] = useState(null);
  const [paymentType, setPaymentType] = useState('');
  const [loading, setLoading] = useState(false);

  const perfil = () =>{
    
  }

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleConfirmarPagamento = async () => {
    if (!termos) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Você precisa concordar com os termos de uso antes de confirmar o pagamento.',
      });
      return;
    }

    if (!selectedParoquia || !selectedDestino) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Você precisa selecionar uma paróquia e um destino.',
      });
      return;
    }

    if (!paymentType) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Selecione uma forma de pagamento.',
      });
      return;
    }

    const newReservation = {
      ticket: {
        idUsuario: usuario?.id,
        quantidade: 1,
        preco: selectedDestinoPreco,
        status: 'Confirmado',
        type: paymentType,
      },
      travel: {
        idParoquia: selectedParoquia,
        idOnibus: selectedBusId,
        idPlace: selectedDestinoId,
        data_partida: ida,
      },
    };

    try {
      setLoading(true);

      const response = await fetch(`${env.url.local}/reservation/register`, {
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
          text: 'Sua reserva foi confirmada com sucesso!',
        });
        navigate('/perfil')
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao processar a reserva.');
      }
    } catch (error) {
      console.error('Erro ao confirmar a reserva:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível confirmar sua reserva. Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchAllParoquias() {
      try {
        setLoading(true);
        const response = await fetch(env.url.local + '/local/', {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setParoquias(data.data || []);
      } catch (error) {
        console.error('Erro ao buscar as paróquias:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllParoquias();
  }, []);

  useEffect(() => {
    async function fetchAllDestino() {
      try {
        setLoading(true);
        const response = await fetch(env.url.local + '/place/', {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setDestino(data.data || []);
      } catch (error) {
        console.error('Erro ao buscar os destinos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllDestino();
  }, []);

 
    async function fetchAllBuss() {
      try {
        setLoading(true);
        const response = await fetch(env.url.local + '/bus/', {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setBus(data.data || []);
      } catch (error) {
        console.error('Erro ao buscar os ônibus:', error);
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    fetchAllBuss();
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
          <select value={paymentType} onChange={handlePaymentTypeChange}>
            <option value="">Selecione uma forma de pagamento</option>
            <option value="pix">Pix</option>
            <option value="card">Cartão de Crédito</option>
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
                  setSelectedDestinoPreco(selectedDestinoObj.preco_unitario);
                  setSelectedDestinoId(selectedDestinoObj.id);
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
          <div className="selects">
            <label htmlFor="selectBus">Selecione o Ônibus</label>
            <select
              name="selectBus"
              id="selectBus"
              value={selectedBusId}
              onChange={(e) => {
                setSelectedBusId(e.target.value);
                // Opcional: adicionar lógica para capturar outras informações do ônibus, se necessário
              }}
            >
              <option value="none">Selecione um ônibus...</option>
              {bus.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.numero} 
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
          <p>
            {selectedDestinoPreco
              ? new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(selectedDestinoPreco)
              : 'Nenhum Destino Selecionado'}
          </p>
        </div>

        {/* Extrato */}
        <div className="card">
          <h3>Extrato</h3>
          <div>
            <p>
              {selectedDestinoPreco
                ? new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(selectedDestinoPreco)
                : 'Nenhum Destino Selecionado'}
            </p>
          </div>
        </div>

        {/* Confirmação e Termos de Uso */}

      </div>
    </div>
  );
};

export default CheckoutPage;
