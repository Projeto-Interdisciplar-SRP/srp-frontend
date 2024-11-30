import { useEffect, useState } from "react";
import Header from "../../utilizavel/Header";
import Modal from "../../utilizavel/Modal";
import DataTable from "../../utilizavel/DataTable";
import Card from "../../utilizavel/Card";
import "../../../styles/modelo_crud.css";
import env from "/env.js";
import Loading from '../../../assets/Loading.gif'
export default function ReservaCoordenador() {
    const [reservations, setReservations] = useState([]); // all reservations
    const [singleReservation, setSingleReservation] = useState({}); // selected reservation data
    const [singleUpdatedReservation, setSingleUpdatedReservation] = useState({}); // selected reservation data
    const [singleDetailsReservation, setSingleDetailsReservation] = useState({}); // selected reservation data

    const [loading, setLoading] = useState(false);

    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalNewReservation, setModalNewReservation] = useState(false);

    //para os modais de edição / registro
    const [users, setUsers] = useState([]);
    const [parishes, setParishes] = useState([]);
    const [buses, setBuses] = useState([]);
    const [place, setPlace] = useState([]);

    // Função genérica para buscar dados
    const fetchSelectData = async (url, setData) => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': true,
                },
            });
            const data = await response.json();
            setData(data.data || data); // Usar `data` ou `data.data` dependendo da estrutura da API
        } catch (error) {
            console.error(`Erro ao carregar dados de ${url}:`, error);
        }
    };

    // Fetch all reservations
    async function fetchAllReservations() {

        const response = await fetch(env.url.local + '/reservation/', {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (Array.isArray(data.data)) {
            setReservations(data.data);
        } else {
            console.error("Response is not a valid array", data.data);
        }

    }

    // handle everything that has to be done when page is opne
    async function handleBeginPage() {

        setLoading(true);

        await fetchSelectData(env.url.local + '/user/', setUsers);
        await fetchSelectData(env.url.local + '/local/', setParishes);
        await fetchSelectData(env.url.local + '/bus/', setBuses);
        await fetchSelectData(env.url.local + '/place/', setPlace);

        await fetchAllReservations();

        setLoading(false);

    }

    useEffect(() => {

        handleBeginPage();

    }, []);

    // Handle updating a reservation
    const handleUpdateReservation = async (e) => {
        e.preventDefault();

        try {
            // Atualiza o corpo da reserva conforme o formato esperado pela API
            const updatedReservation = {
                id: singleUpdatedReservation.id,
                idOnibus: singleUpdatedReservation.busId,
                idParoquia: singleUpdatedReservation.localId,
                data_partida: singleUpdatedReservation.dataPartida,
                idUsuario: singleUpdatedReservation.userId,
                idPlace: singleUpdatedReservation.placeId,
                preco: singleUpdatedReservation.preco,
                quantidade: singleUpdatedReservation.quantidade,
                status: singleUpdatedReservation.pagamentoStatus,
                type: singleReservation.type
            };

            const response = await fetch(env.url.local + `/reservation/edit/${singleUpdatedReservation.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedReservation),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar reserva.');
            }

            // Fechar o modal de edição e atualizar a lista de reservas
            setModalEdit(false);
            fetchAllReservations();
        } catch (error) {
            console.error('Erro ao editar a reserva:', error);
            alert('Falha ao atualizar a reserva. Tente novamente.');
        }
    };

    // Handle creating a new reservation
    const handleNewReservation = async (e) => {
        e.preventDefault();

        const newReservation = {
            ticket: {
                idUsuario: singleReservation.userId,
                quantidade: singleReservation.quantidade,
                preco: singleReservation.preco,
                status: singleReservation.pagamentoStatus,
                type: singleReservation.type,
              },
              travel: {
                idParoquia: singleReservation.localId,
                idOnibus: singleReservation.busId,
                idPlace: singleUpdatedReservation.placeId,
                data_partida: singleReservation.dataPartida,
              },
        };

        await fetch(env.url.local + '/reservation/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReservation)
        });

        setModalNewReservation(false);
        setSingleReservation({});
        fetchAllReservations();
    };

    // Handle deleting a reservation
    const handleDeleteReservation = async () => {

        await fetch(env.url.local + `/reservation/delete/${singleReservation.id}`, {
            method: 'DELETE'
        });
        setModalDelete(false);
        fetchAllReservations();
    };

    if (loading) {
        return <div className="Carregando"> 
        <img src={Loading} alt="" />
</div>;
    }

    return (
        <div>

            {/* Edit Modal */}
            <Modal isOpen={modalEdit} closeModal={() => setModalEdit(false)}>
                <form onSubmit={handleUpdateReservation}>
                    <h2>Editar Reserva</h2>
                    <div className="input">
                        <div className="input-group">

                            {/* Usuário */}
                            <label>Usuário:</label>
                            <select
                                name="userId"
                                required
                                value={singleUpdatedReservation.userId || ''}
                                onChange={(e) => {
                                    setSingleUpdatedReservation((prev) => ({
                                        ...prev,
                                        userId: e.target.value,
                                    }));
                                }}
                            >
                                <option value="">Selecione...</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            {/* Paróquia */}
                            <label>Paróquia:</label>
                            <select
                                name="localId"
                                required
                                value={singleUpdatedReservation.localId || ''}
                                onChange={(e) =>
                                    setSingleUpdatedReservation((prev) => ({
                                        ...prev,
                                        localId: e.target.value,
                                    }))
                                }
                            >
                                <option value="">Selecione...</option>
                                {parishes.map((parish) => (
                                    <option key={parish.id} value={parish.id}>
                                        {parish.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            {/* Paróquia */}
                            <label>Viagem:</label>
                            <select
                                name="localId"
                                required
                                value={singleUpdatedReservation.placeId || ''}
                                onChange={(e) =>
                                    setSingleUpdatedReservation((prev) => ({
                                        ...prev,
                                        placeId: e.target.value,
                                    }))
                                }
                            >
                                <option value="">Selecione...</option>
                                {place.map((pacles) => (
                                    <option key={pacles.id} value={pacles.id}>
                                        {pacles.destino}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            {/* Ônibus */}
                            <label>Ônibus:</label>
                            <select
                                name="busId"
                                required
                                value={singleUpdatedReservation.busId || ''}
                                onChange={(e) =>
                                    setSingleUpdatedReservation((prev) => ({
                                        ...prev,
                                        busId: e.target.value,
                                    }))
                                }
                            >
                                <option value="">Selecione...</option>
                                {buses.map((bus) => (
                                    <option key={bus.id} value={bus.id}>
                                        {bus.placa_onibus}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* Data de partida */}
                    <label>Data de Partida:</label>
                    <input
                        type="datetime-local"
                        name="dataPartida"
                        required
                        value={
                            singleUpdatedReservation.dataPartida
                                ? new Date(singleUpdatedReservation.dataPartida).toLocaleString('sv-SE').slice(0, 16)
                                : ''
                        }
                        onChange={(e) =>
                            setSingleUpdatedReservation((prev) => ({
                                ...prev,
                                dataPartida: new Date(e.target.value).getTime(),
                            }))
                        }
                    />

                    {/* Quantidade de bilhetes */}
                    <label>Quantidade:</label>
                    <input
                        type="number"
                        name="quantidade"
                        min="1"
                        value={singleUpdatedReservation.quantidade || ''}
                        onChange={(e) =>
                            setSingleUpdatedReservation((prev) => ({
                                ...prev,
                                quantidade: e.target.value,
                            }))
                        }
                    />

                    {/* Preço */}
                    <label>Preço:</label>
                    <input
                        type="number"
                        name="preco"
                        step="0.01"
                        value={singleUpdatedReservation.preco || ''}
                        onChange={(e) =>
                            setSingleUpdatedReservation((prev) => ({
                                ...prev,
                                preco: e.target.value,
                            }))
                        }
                    />
<label>Forma de Pagamento:</label>
                    <input
                        type="text"
                        name="preco"
                        step="0.01"
                        placeholder="Pix ou Cartão de Crédito"
                        value={singleReservation.type}
                        onChange={(e) => setSingleReservation({ ...singleReservation, type: e.target.value })}
                    />
                    {/* Status */}
                    <label>Status:</label>
                    <select
                        name="pagamentoStatus"
                        value={singleUpdatedReservation.pagamentoStatus || ''}
                        onChange={(e) =>
                            setSingleUpdatedReservation((prev) => ({
                                ...prev,
                                pagamentoStatus: e.target.value,
                            }))
                        }
                    >
                        <option value="pendente">Pendente</option>
                        <option value="confirmado">Confirmado</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
                <button type="submit">Salvar Alterações</button>
                <button type="button" onClick={() => setModalEdit(false)}>
                    Cancelar
                </button>
            </form>
        </Modal>

            {/* Delete Modal */ }
    <Modal isOpen={modalDelete} closeModal={() => setModalDelete(false)}>
        <div>
            <h2>Excluir Reserva</h2>
            <p>Tem certeza de que deseja excluir esta reserva?</p>
            <button onClick={() => handleDeleteReservation()}>Sim, excluir</button>
            <button onClick={() => setModalDelete(false)}>Cancelar</button>
        </div>
    </Modal>

    {/* New Reservation Modal */ }
            <Modal isOpen={modalNewReservation} closeModal={() => setModalNewReservation(false)}>
                <form onSubmit={handleNewReservation}>
                    <h2>Cadastrar Reserva</h2>
                    <div className="input">
                        <div className="input-group">
                            <label>Usuário:</label>
                            <select
                                name="userId"
                                value={singleReservation.userId}
                                onChange={(e) => setSingleReservation({ ...singleReservation, userId: e.target.value })}
                                required
                            >
                                <option value="">Selecione...</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Paróquia:</label>
                            <select
                                name="localId"
                                value={singleReservation.localId}
                                onChange={(e) => setSingleReservation({ ...singleReservation, localId: e.target.value })}
                                required
                            >
                                <option value="">Selecione...</option>
                                {parishes.map((parish) => (
                                    <option key={parish.id} value={parish.id}>
                                        {parish.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            {/* Paróquia */}
                            <label>Viagem:</label>
                            <select
                                name="localId"
                                required
                                value={singleUpdatedReservation.placeId || ''}
                                onChange={(e) =>
                                    setSingleUpdatedReservation((prev) => ({
                                        ...prev,
                                        placeId: e.target.value,
                                    }))
                                }
                            >
                                <option value="">Selecione...</option>
                                {place.map((pacles) => (
                                    <option key={pacles.id} value={pacles.id}>
                                        {pacles.destino}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Ônibus:</label>
                            <select
                                name="busId"
                                value={singleReservation.busId}
                                onChange={(e) => setSingleReservation({ ...singleReservation, busId: e.target.value })}
                                required
                            >
                                <option value="">Selecione...</option>
                                {buses.map((bus) => (
                                    <option key={bus.id} value={bus.id}>
                                        {bus.placa_onibus}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* Data de partida */}
                    <label>Data de Partida:</label>
                    <input
                        type="datetime-local"
                        name="dataPartida"
                        value={singleReservation.dataPartida}
                        onChange={(e) => setSingleReservation({ ...singleReservation, dataPartida: e.target.value })}
                        required
                    />

                    {/* Quantidade de bilhetes */}
                    <label>Quantidade:</label>
                    <input
                        type="number"
                        name="quantidade"
                        min="1"
                        value={singleReservation.quantidade}
                        onChange={(e) => setSingleReservation({ ...singleReservation, quantidade: e.target.value })}
                    />

                    {/* Preço */}
                    <label>Preço:</label>
                    <input
                        type="number"
                        name="preco"
                        step="0.01"
                        value={singleReservation.preco}
                        onChange={(e) => setSingleReservation({ ...singleReservation, preco: e.target.value })}
                    />
                    <label>Forma de Pagamento:</label>
                    <input
                        type="text"
                        name="preco"
                        step="0.01"
                        placeholder="Pix ou Cartão de Crédito"
                        value={singleReservation.type}
                        onChange={(e) => setSingleReservation({ ...singleReservation, type: e.target.value })}
                    />

                    {/* Status */}
                    <label>Status:</label>
                    <select
                        name="pagamentoStatus"
                        value={singleReservation.pagamentoStatus}
                        onChange={(e) => setSingleReservation({ ...singleReservation, pagamentoStatus: e.target.value })}
                    >
                        <option value="Pendente">Pendente</option>
                        <option value="Confirmado">Confirmado</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>

                    <button type="submit">Salvar Reserva</button>
                    <button type="button" onClick={() => setModalNewReservation(false)}>
                        Cancelar
                    </button>
                </form>
            </Modal>

            <Header className="header" which="funcsecretaria" />

            <DataTable
                data={reservations}
                columns={[
                    { header: "Nome do Usuário", accessor: "userNome" },
                    { header: "CPF do Usuário", accessor: "userCpf" },
                    { header: "RG do Usuário", accessor: "userRg" },
                    { header: "Nome do Local", accessor: "localNome" },
                    { header: "Quant. Passagens", accessor: "quantidade" },
                    { header: "Preço Passagem", accessor: "preco" },
                    { header: "Status", accessor: "pagamentoStatus" },
                ]}

                eventEditButton={(item) => {
                    setSingleUpdatedReservation(item);
                    setModalEdit(true);

                }}
                eventDelButton={(item) => {
                    setSingleReservation(item);
                    setModalDelete(true);
                }}
                searchField={'userEmail'}
                itemsPerPage={5}

            />

            <div className="cards-bottom">
                <Card width={'100%'} height={'auto'}
                    childrenTop={(
                        <div>
                            <span className="new-reservation-top-span">
                                <h2>Nova Reserva</h2>
                            </span>
                        </div>
                    )}
                    childrenBottom={(
                        <span>
                            <p style={{ marginBottom: 12 }}>Registre uma nova reserva.</p>
                            <button onClick={() => { setSingleReservation({}); setModalNewReservation(true); }}>Criar</button>
                        </span>
                    )}
                />
            </div>
        </div >
    );
}
