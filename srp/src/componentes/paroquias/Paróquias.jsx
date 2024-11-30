import { useEffect, useState } from "react";
import Header from "../utilizavel/Header";
import Modal from "../utilizavel/Modal";
import DataTable from "../utilizavel/DataTable";
import Card from "../utilizavel/Card";
import "../../styles/modelo_crud.css";
import env from "/env.js";

export default function Paroquias() {
    const [useParoquias, setParoquias] = useState([]); // lista de paróquias
    const [useSingleParoquia, setUseSingleParoquia] = useState({}); // dados de uma paróquia selecionada

    const [useLoading, setLoading] = useState(false);

    const [useModalEdit, setModalEdit] = useState(false);
    const [useModalDelete, setModalDelete] = useState(false);
    const [useModalNewParoquia, setModalNewParoquia] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchAllParoquias();
    }, []);

    // Função que recupera a lista de paróquias
    async function fetchAllParoquias() {
        const response = await fetch(env.url.local + '/local', {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (Array.isArray(data.data)) {
            setParoquias(data.data);
        } else {
            console.error("A resposta não é um array válido", data.data);
        }
        setLoading(false);
    }

    // Função para enviar a atualização da paróquia
    const handleUpdateParoquia = async (e) => {
        e.preventDefault();

        const updatedParoquia = {
            id: useSingleParoquia.id,
            nome: useSingleParoquia.nome,
            rua: useSingleParoquia.rua,
            bairro: useSingleParoquia.bairro,
            cidade: useSingleParoquia.cidade,
        };

        await fetch(env.url.local + `/local/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedParoquia)
        });

        setModalEdit(false);
        fetchAllParoquias();
    };

    const handleNewParoquia = async (e) => {
        e.preventDefault();

        const registeredParoquia = {
            nome: useSingleParoquia.nome,
            rua: useSingleParoquia.rua,
            bairro: useSingleParoquia.bairro,
            cidade: useSingleParoquia.cidade,
        };

        await fetch(env.url.local + `/local/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registeredParoquia)
        });

        setModalNewParoquia(false);
        setUseSingleParoquia({});

        fetchAllParoquias();
    };

    const handleDeleteParoquia = async () => {
        await fetch(env.url.local + `/local/delete/` + useSingleParoquia.id, {
            method: 'DELETE'
        });
        setModalDelete(false);
        fetchAllParoquias();
    };

    if (useLoading) {
        return <h1>Carregando...</h1>;
    }

    return (
        <div>
            <Modal isOpen={useModalEdit} closeModal={() => setModalEdit(false)}>
                <form onSubmit={handleUpdateParoquia}>
                    <h2>Editar paróquia</h2>
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        value={useSingleParoquia.nome || ""} 
                        onChange={(e) => setUseSingleParoquia({ ...useSingleParoquia, nome: e.target.value })} 
                    />
                    <label>Rua:</label>
                    <input 
                        type="text" 
                        value={useSingleParoquia.rua || ""} 
                        onChange={(e) => setUseSingleParoquia({ ...useSingleParoquia, rua: e.target.value })} 
                    />
                    <label>Bairro:</label>
                    <input 
                        type="text" 
                        value={useSingleParoquia.bairro || ""} 
                        onChange={(e) => setUseSingleParoquia({ ...useSingleParoquia, bairro: e.target.value })} 
                    />
                    <label>Cidade:</label>
                    <input 
                        type="text" 
                        value={useSingleParoquia.cidade || ""} 
                        onChange={(e) => setUseSingleParoquia({ ...useSingleParoquia, cidade: e.target.value })} 
                    />
                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onClick={() => setModalEdit(false)}>Cancelar</button>
                </form>
            </Modal>

            <Modal isOpen={useModalDelete} closeModal={() => setModalDelete(false)}>
                <div>
                    <h2>Excluir paróquia</h2>
                    <p>Tem certeza de que deseja excluir esta paróquia?</p>
                    <button onClick={() => handleDeleteParoquia()}>Sim, excluir</button>
                    <button onClick={() => setModalDelete(false)}>Cancelar</button>
                </div>
            </Modal>

            <Modal isOpen={useModalNewParoquia} closeModal={() => setModalNewParoquia(false)}>
                <form onSubmit={handleNewParoquia}>
                    <h2>Cadastrar paróquia</h2>
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        value={useSingleParoquia.nome || ""} 
                        onChange={(e) => setUseSingleParoquia({ ...useSingleParoquia, nome: e.target.value })} 
                    />
                    <label>Rua:</label>
                    <input 
                        type="text" 
                        value={useSingleParoquia.rua || ""} 
                        onChange={(e) => setUseSingleParoquia({ ...useSingleParoquia, rua: e.target.value })} 
                    />
                    <label>Bairro:</label>
                    <input 
                        type="text" 
                        value={useSingleParoquia.bairro || ""} 
                        onChange={(e) => setUseSingleParoquia({ ...useSingleParoquia, bairro: e.target.value })} 
                    />
                    <label>Cidade:</label>
                    <input 
                        type="text" 
                        value={useSingleParoquia.cidade || ""} 
                        onChange={(e) => setUseSingleParoquia({ ...useSingleParoquia, cidade: e.target.value })} 
                    />
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={() => setModalNewParoquia(false)}>Cancelar</button>
                </form>
            </Modal>

            <Header className="header" which="funcsecretaria" />

            <DataTable 
                data={useParoquias} 
                columns={[
                    { header: "ID", accessor: "id" },
                    { header: "Nome", accessor: "nome" },
                    { header: "Rua", accessor: "rua" },
                    { header: "Bairro", accessor: "bairro" },
                    { header: "Cidade", accessor: "cidade" },
                ]}
                eventEditButton={(item) => { 
                    setModalEdit(true); 
                    setUseSingleParoquia(item); 
                }} 
                eventDelButton={(item) => { 
                    setModalDelete(true); 
                    setUseSingleParoquia(item);
                }}
                searchField={'nome'}
                itemsPerPage={5}
            />

            <div className="cards-bottom">
                <Card width={'100%'} height={'auto'} 
                    childrenTop={(
                        <div>
                            <span className="new-paroquia-top-span">
                                <h2>Nova Paróquia</h2>
                            </span>
                        </div>
                    )}
                    childrenBottom={(
                        <span>
                            <p style={{marginBottom: 12}}>Registre uma nova paróquia.</p>
                            <button onClick={() => {setUseSingleParoquia({}); setModalNewParoquia(true);}}>Criar</button>
                        </span>
                    )}
                />
            </div>
        </div>
    );
}
