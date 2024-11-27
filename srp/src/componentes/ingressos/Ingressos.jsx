import { useEffect, useState } from "react";
import Header from "../../utilizavel/Header";
import Modal from "../../utilizavel/Modal";
import DataTable from "../../utilizavel/DataTable";
import Card from "../../utilizavel/Card";
import "../../../styles/modelo_crud.css";
import env from "/env.js";

export default function IngressosCoordenador() {
    const [tickets, setTickets] = useState([]); // Todos os ingressos
    const [singleTicket, setSingleTicket] = useState({}); // Dados de um ingresso selecionado

    const [useLoading, setLoading] = useState(false);
    const [useModalView, setModalView] = useState(false); // Modal para detalhes do ingresso

    useEffect(() => {
        setLoading(true);
        fetchAllTickets();
    }, []);

    // Função que recupera a lista de ingressos
    async function fetchAllTickets() {
        const response = await fetch(env.url.local + '/ticket/', {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (Array.isArray(data.data)) {
            setTickets(data.data);
        } else {
            console.error("A resposta não é um array válido", data.data);
        }
        setLoading(false);
    }

    if (useLoading) {
        return <h1>Carregando...</h1>;
    }

    return (
        <div>
            {/* Modal para exibir detalhes do ingresso */}
            <Modal isOpen={useModalView} closeModal={() => setModalView(false)}>
                <div>
                    <h2>Detalhes do Ingresso</h2>
                    <p><strong>ID Usuário:</strong> {singleTicket.id_usuario}</p>
                    <p><strong>Quantidade:</strong> {singleTicket.quantidade}</p>
                    <p><strong>Preço:</strong> R$ {singleTicket.preco}</p>
                    <p><strong>Status:</strong> {singleTicket.status}</p>
                    <p><strong>Forma de Pagamento:</strong> {singleTicket.forma_pagamento}</p>
                    <button onClick={() => setModalView(false)}>Fechar</button>
                </div>
            </Modal>

            <Header className="header" which="coordenador" />

            {/* DataTable para listar ingressos */}
            <DataTable
                data={tickets}
                columns={[
                    { header: "ID Usuário", accessor: "id_usuario" },
                    { header: "Quantidade", accessor: "quantidade" },
                    { header: "Preço", accessor: "preco" },
                    { header: "Status", accessor: "status" },
                    { header: "Forma de Pagamento", accessor: "forma_pagamento" },
                ]}
                eventEditButton={(item) => { 
                    setModalView(true);
                    setSingleTicket(item);
                }}
                searchField={"id_usuario"}
                itemsPerPage={5}
            />

            <div className="cards-bottom">
                <Card 
                    width={"100%"} 
                    height={"auto"} 
                    childrenTop={(
                        <div>
                            <h2>Ingressos</h2>
                        </div>
                    )}
                    childrenBottom={(
                        <span>
                            <p>Visualize os ingressos registrados no sistema.</p>
                        </span>
                    )}
                />
            </div>
        </div>
    );
}
