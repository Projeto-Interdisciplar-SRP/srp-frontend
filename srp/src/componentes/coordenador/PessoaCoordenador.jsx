import { useEffect, useState } from "react";
import Header from "../utilizavel/Header";
import Modal from "../utilizavel/Modal";

import "../../styles/pessoa_coordenador.css";
import env from "/env.js";

export default function PessoaCoordenador() {
    const [useUsers, setUsers] = useState([]);// todos os usuarios
    const [useSingleUser, setUseSingleUser] = useState(null);//id de um usuário selecionado (para requisições q precisam de id)

    const [useLoading, setLoading] = useState(false);
    
    const [useModalEdit, setModalEdit] = useState(false);
    const [useModalDelete, setModalDelete] = useState(false);
    
    useEffect(() => {
        setLoading(true);

        fetchAllUsers();
    }, []);

    // Função que recupera a lista de usuários
    async function fetchAllUsers() {
        const response = await fetch(env.url.local + '/user/', {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (Array.isArray(data)) {
            setUsers(data);
        } else {
            console.error("A resposta não é um array válido", data);
        }
        setLoading(false);
    }

    // Função para enviar o update do usuário
    const handleUpdateUser = async (e) => {
        e.preventDefault();

        const updatedUser = {
            nome: useSingleUser.nome,
            email: useSingleUser.email,
            senha: useSingleUser.senha,
            rua: useSingleUser.rua,
            bairro: useSingleUser.bairro,
            cidade: useSingleUser.cidade,
            cpf: useSingleUser.cpf,
            rg: useSingleUser.rg,
            telefone: useSingleUser.telefone,
            adm: useSingleUser.adm,
            id_paroquia: useSingleUser.id_paroquia,
        };

        await fetch(env.url.local + `/user/register`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });

        setModalEdit(false);

        fetchAllUsers();

    };

    const handleDeleteUser = async () => {

        await fetch(env.url.local + `/user/delete/` + useSingleUser.id, {
            method: 'DELETE'
        });
        setModalDelete(false);
        fetchAllUsers();
    };

    const modalEditContent = (
        <form onSubmit={handleUpdateUser}>
            <h2>Editar Usuário</h2>
            <label>Nome:</label>
            <input type="text" value={useSingleUser?.nome || ''} onChange={(e) => setUseSingleUser({ ...useSingleUser, nome: e.target.value })} />
            
            <label>Email:</label>
            <input type="email" value={useSingleUser?.email || ''} onChange={(e) => setUseSingleUser({ ...useSingleUser, email: e.target.value })} />

            <label>Rua:</label>
            <input type="text" value={useSingleUser?.rua || ''} onChange={(e) => setUseSingleUser({ ...useSingleUser, rua: e.target.value })} />
            
            <label>Bairro:</label>
            <input type="text" value={useSingleUser?.bairro || ''} onChange={(e) => setUseSingleUser({ ...useSingleUser, bairro: e.target.value })} />
            
            <label>Cidade:</label>
            <input type="text" value={useSingleUser?.cidade || ''} onChange={(e) => setUseSingleUser({ ...useSingleUser, cidade: e.target.value })} />

            <label>CPF:</label>
            <input type="text" value={useSingleUser?.cpf || ''} onChange={(e) => setUseSingleUser({ ...useSingleUser, cpf: e.target.value })} />

            <label>RG:</label>
            <input type="text" value={useSingleUser?.rg || ''} onChange={(e) => setUseSingleUser({ ...useSingleUser, rg: e.target.value })} />

            <label>Telefone:</label>
            <input type="text" value={useSingleUser?.telefone || ''} onChange={(e) => setUseSingleUser({ ...useSingleUser, telefone: e.target.value })} />

            <button type="submit">Salvar Alterações</button>
            <button type="button" onClick={() => setModalEdit(false)}>Cancelar</button>
        </form>
    );

    const modalDeleteContent = (
        <div>
            <h2>Excluir Usuário</h2>
            <p>Tem certeza de que deseja excluir este usuário?</p>
            <button onClick={() => handleDeleteUser()}>Sim, excluir</button>
            <button onClick={() => setModalDelete(false)}>Cancelar</button>
        </div>
    );

    if (useLoading) {
        return <h1>Carregando...</h1>;
    }

    //variavel q percorre os dados recebidos e joga eles para o formato de linhas na tabela em html
    //AQUI ONDE O SINGLE USER É DEFINIDO
    const rows = useUsers.map((user, index) => (
        <tr key={index}>
            <td>{user.id}</td>
            <td>{user.nome}</td>
            <td>{user.email}</td>
            <td>{user.cpf}</td>
            <td>{user.rg}</td>
            <td>{user.cidade}</td>
            <td><button onClick={() => { setUseSingleUser(user); setModalEdit(true); }}>Editar</button></td>
            <td><button onClick={() => { setUseSingleUser(user); setModalDelete(true); }}>Excluir</button></td>
        </tr>
    ));

    return (
        <div>
            <Modal isOpen={useModalEdit} closeModal={() => setModalEdit(false)}>{modalEditContent}</Modal>
            <Modal isOpen={useModalDelete} closeModal={() => setModalDelete(false)}>{modalDeleteContent}</Modal>

            <Header className="header" which="coordenador" page="pessoas"/>
            <div className="table-container">
                <h2 className="title">Tabela de Usuários</h2>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th className="table-header">ID</th>
                            <th className="table-header">Nome</th>
                            <th className="table-header">Email</th>
                            <th className="table-header">CPF</th>
                            <th className="table-header">RG</th>
                            <th className="table-header">Cidade</th>
                            <th className="table-header">Editar</th>
                            <th className="table-header">Excluir</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    );
}