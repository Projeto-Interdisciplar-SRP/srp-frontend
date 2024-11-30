import { useEffect, useState } from "react";
import Header from "../../utilizavel/Header";
import Modal from "../../utilizavel/Modal";
import DataTable from "../../utilizavel/DataTable";
import Card from "../../utilizavel/Card";
import "../../../styles/modelo_crud.css";
import env from "/env.js";
import Loading from "../../../assets/Loading.gif"


export default function ViagensCoordenador() {
    const [useTrips, setTrips] = useState([]); // Todas as viagens
    const [useSingleTrip, setUseSingleTrip] = useState({}); // Dados de uma viagem selecionada

    const [useLoading, setLoading] = useState(false);

    const [useModalEdit, setModalEdit] = useState(false);
    const [useModalDelete, setModalDelete] = useState(false);
    const [useModalNewTrip, setModalNewTrip] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchAllTrips();
    }, []);

    // Função que recupera a lista de viagens
    async function fetchAllTrips() {
        const response = await fetch(env.url.local + '/place/', {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (Array.isArray(data.data)) {
            setTrips(data.data);
        } else {
            console.error("A resposta não é um array válido", data.data);
        }
        setLoading(false);
    }

    // Função para enviar o update da viagem
    const handleUpdateTrip = async (e) => {
        e.preventDefault();

        const updatedTrip = {
            id: useSingleTrip.id,
            destino: useSingleTrip.destino,
            preco_unitario: useSingleTrip.preco_unitario,
            ida: useSingleTrip.ida,
            volta: useSingleTrip.volta
        };

        await fetch(env.url.local + `/place/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            },
            mode: 'cors',
            body: JSON.stringify(updatedTrip)
        });

        setModalEdit(false);
        fetchAllTrips();
    };

    // Função para cadastrar uma nova viagem
    const handleNewTrip = async (e) => {
        e.preventDefault();

        const registeredTrip = {
          destino: useSingleTrip.destino,
          preco_unitario: useSingleTrip.preco_unitario,
          ida: useSingleTrip.ida,
          volta: useSingleTrip.volta
        };

        await fetch(env.url.local + `/place/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registeredTrip)
        });

        setModalNewTrip(false);
        setUseSingleTrip({});

        fetchAllTrips();
    };

    // Função para excluir uma viagem
    const handleDeleteTrip = async () => {
        await fetch(env.url.local + `/place/delete/` + useSingleTrip.id, {
            method: 'DELETE'
        });
        setModalDelete(false);
        fetchAllTrips();
    };

    if (useLoading) {
        return <div className="Carregando"> 
                <img src={Loading} alt="" />
        </div>;
    }

    return (
        <div>
            <Modal isOpen={useModalEdit} closeModal={() => setModalEdit(false)}>
                <form onSubmit={handleUpdateTrip}>
                    <h2>Editar Viagem</h2>
                    <label>Destino:</label>
                    <input 
                        type="text" 
                        value={useSingleTrip.destino || ""} 
                        onChange={(e) => setUseSingleTrip({ ...useSingleTrip, destino: e.target.value })} 
                    />

                    <label>Preço do Ingresso 'Unitario':</label>
                    <input 
                        type="number" 
                        value={useSingleTrip.preco_unitario || ""} 
                        onChange={(e) => setUseSingleTrip({ ...useSingleTrip, preco_unitario: e.target.value })} 
                    />
                    
                    <label>Ida:</label>
                    <input 
                        type="datetime-local" 
                        value={useSingleTrip.ida || ""} 
                        onChange={(e) => setUseSingleTrip({ ...useSingleTrip, ida: e.target.value })} 
                    />

                    <label>Volta:</label>
                    <input 
                        type="datetime-local" 
                        value={useSingleTrip.volta || ""} 
                        onChange={(e) => setUseSingleTrip({ ...useSingleTrip, volta: e.target.value })} 
                    />

                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onClick={() => setModalEdit(false)}>Cancelar</button>
                </form>
            </Modal>

            <Modal isOpen={useModalDelete} closeModal={() => setModalDelete(false)}>
                <div>
                    <h2>Excluir Viagem</h2>
                    <p>Tem certeza de que deseja excluir esta viagem?</p>
                    <button onClick={() => handleDeleteTrip()}>Sim, excluir</button>
                    <button onClick={() => setModalDelete(false)}>Cancelar</button>
                </div>
            </Modal>

            <Modal isOpen={useModalNewTrip} closeModal={() => setModalNewTrip(false)}>
                <form onSubmit={handleNewTrip}>
                    <h2>Cadastrar Viagem</h2>
                    <label>Destino:</label>
                    <input 
                        type="text" 
                        value={useSingleTrip.destino || ""} 
                        onChange={(e) => setUseSingleTrip({ ...useSingleTrip, destino: e.target.value })} 
                    />
                    <label>Preço do Ingresso 'Unitario':</label>
                    <input 
                        type="number" 
                        value={useSingleTrip.preco_unitario || ""} 
                        onChange={(e) => setUseSingleTrip({ ...useSingleTrip, preco_unitario: e.target.value })} 
                    />
                    
                    <label>Ida:</label>
                    <input 
                        type="datetime-local" 
                        value={useSingleTrip.ida || ""} 
                        onChange={(e) => setUseSingleTrip({ ...useSingleTrip, ida: e.target.value })} 
                    />

                    <label>Volta:</label>
                    <input 
                        type="datetime-local" 
                        value={useSingleTrip.volta || ""} 
                        onChange={(e) => setUseSingleTrip({ ...useSingleTrip, volta: e.target.value })} 
                    />

                    <button type="submit">Cadastrar</button>
                    <button type="button" onClick={() => setModalNewTrip(false)}>Cancelar</button>
                </form>
            </Modal>

            <Header className="header" which="funcsecretaria" />

            <DataTable 
                data={useTrips} 
                columns={[    
                    { header: "ID", accessor: "id" },
                    { header: "Destino", accessor: "destino" },
                    { header: "Preço do Ingresso", accessor: "preco_unitario" },
                    { header: "Ida", accessor: "ida" },
                    { header: "Volta", accessor: "volta" }
                ]} 
                eventEditButton={(item) => { 
                    setModalEdit(true); 
                    setUseSingleTrip(item); 
                }} 
                eventDelButton={(item) => { 
                    setModalDelete(true); 
                    setUseSingleTrip(item);
                }}
                searchField={'Destino'}
                itemsPerPage={5}
            />

            <div className="cards-bottom">
                <Card width={'100%'} height={'auto'} 
                    childrenTop={(
                        <div>
                            <span className="new-trip-top-span">
                                <h2>Nova Viagem</h2>
                                <svg width={25} stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 14h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1zM18 17c-.553 0-1-.448-1-1v-6c0-.552.447-1 1-1s1 .448 1 1v6c0 .552-.447 1-1 1zM9 6c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3m0-2c-2.764 0-5 2.238-5 5s2.236 5 5 5 5-2.238 5-5-2.236-5-5-5zM9 17c2.021 0 3.301.771 3.783 1.445-.683.26-1.969.555-3.783.555-1.984 0-3.206-.305-3.818-.542.459-.715 1.777-1.458 3.818-1.458m0-2c-3.75 0-6 2-6 4 0 1 2.25 2 6 2 3.518 0 6-1 6-2 0-2-2.354-4-6-4z"></path></svg>    
                            </span>
                        </div>
                    )}
                    childrenBottom={(
                        <span>
                            <p style={{marginBottom: 12}}>Registre uma nova viagem.</p>
                            <button onClick={() => {setUseSingleTrip({}); setModalNewTrip(true);}}>Criar</button>
                        </span>
                    )}
                />
            </div>
        </div>
    )
}
