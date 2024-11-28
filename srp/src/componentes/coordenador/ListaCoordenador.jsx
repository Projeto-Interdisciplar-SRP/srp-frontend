import { useEffect, useState } from "react";
import Header from "../utilizavel/Header";
import Modal from "../utilizavel/Modal";
import DataTable from "../utilizavel/DataTable";
import Card from "../utilizavel/Card";
import "../../styles/modelo_crud.css";
import env from "/env.js";
import { useNavigate } from "react-router-dom";

export default function PessoaCoordenador() {
    const navigate = useNavigate();
    const [coordenadores, setCoordenadores] = useState([]);
    const [coordenadorSelecionado, setCoordenadorSelecionado] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);

    const cadastroCoordenador = () =>{
      navigate('/secretaria/cadastro/coordenador')
    };

    useEffect(() => {
        setCarregando(true);
        buscarCoordenadores();
    }, []);

    async function buscarCoordenadores() {
        const response = await fetch(env.url.local + '/user/coordinator', {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (Array.isArray(data)) {
            setCoordenadores(data);
        } else {
            console.error("Resposta inválida", data);
        }
        setCarregando(false);
    }

    const handleEditarCoordenador = async (e) => {
        e.preventDefault();
        const coordenadorAtualizado = {
            ...coordenadorSelecionado
        };

        await fetch(env.url.local + `/user/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(coordenadorAtualizado)
        });

        setModalEditar(false);
        buscarCoordenadores();
    };

    const handleExcluirCoordenador = async () => {
        await fetch(env.url.local + `/user/delete/${coordenadorSelecionado.id}`, {
            method: 'DELETE'
        });
        setModalExcluir(false);
        buscarCoordenadores();
    };

    if (carregando) {
        return <h1>Carregando...</h1>;
    }

    return (
        <div>
            <Header className="header" which="coordenador" />

            <Modal isOpen={modalEditar} closeModal={() => setModalEditar(false)}>
                <form onSubmit={handleEditarCoordenador}>
                    <h2>Editar Coordenador</h2>
                    <div className="input">
                        <div className="input-group">
                            <label>Nome:</label>
                            <input
                                type="text"
                                value={coordenadorSelecionado?.nome || ''}
                                onChange={(e) =>
                                    setCoordenadorSelecionado({ ...coordenadorSelecionado, nome: e.target.value })
                                }
                            />
                        </div>
                        <div className="input-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={coordenadorSelecionado?.email || ''}
                                onChange={(e) =>
                                    setCoordenadorSelecionado({ ...coordenadorSelecionado, email: e.target.value })
                                }
                            />
                        </div>
                        {/* Adicione outros campos necessários aqui */}
                    </div>
                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onClick={() => setModalEditar(false)}>Cancelar</button>
                </form>
            </Modal>

            <Modal isOpen={modalExcluir} closeModal={() => setModalExcluir(false)}>
                <div>
                    <h2>Excluir Coordenador</h2>
                    <p>Tem certeza de que deseja excluir este coordenador?</p>
                    <button onClick={handleExcluirCoordenador}>Sim, excluir</button>
                    <button onClick={() => setModalExcluir(false)}>Cancelar</button>
                </div>
            </Modal>

            <DataTable
                data={coordenadores}
                columns={[
                    { header: "ID", accessor: "id" },
                    { header: "Nome", accessor: "nome" },
                    { header: "Email", accessor: "email" },
                    { header: "CPF", accessor: "cpf" },
                    { header: "Cidade", accessor: "cidade" },
                ]}
                eventEditButton={(item) => {
                    setModalEditar(true);
                    setCoordenadorSelecionado(item);
                }}
                eventDelButton={(item) => {
                    setModalExcluir(true);
                    setCoordenadorSelecionado(item);
                }}
                searchField="cpf"
                itemsPerPage={5}
            />

            <div className="cards-bottom">
                <Card
                    width="100%"
                    height="auto"
                    childrenTop={
                        <div>
                            <span className="new-coordenador-top-span">
                                <h2>Novo Coordenador</h2>
                            </span>
                        </div>
                    }
                    childrenBottom={
                        <span>
                            <p style={{ marginBottom: 12 }}>Registre um novo coordenador no sistema.</p>
                            <button onClick={cadastroCoordenador}>Criar</button>
                        </span>
                    }
                />
            </div>
        </div>
    );
}
