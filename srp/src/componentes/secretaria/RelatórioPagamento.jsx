import React, { useState } from 'react';
import '../../styles/RelatórioPagamento.css';

const RelatorioPagamentos = () => {
  const [pagamentos] = useState([
    { id: 1, nome: 'Isaias Souza', valor: 50.00, data: '2024-10-01', metodo: 'Cartão' },
    { id: 2, nome: 'Ana Silva', valor: 75.00, data: '2024-10-02', metodo: 'PIX' },
    { id: 3, nome: 'Pedro Santos', valor: 100.00, data: '2024-10-03', metodo: 'Boleto' },
    { id: 4, nome: 'Maria Oliveira', valor: 60.00, data: '2024-10-04', metodo: 'Cartão' },
  ]);

  const totalPagamentos = pagamentos.reduce((acc, pagamento) => acc + pagamento.valor, 0);

  return (
    <div className="relatorio-container">
      <h2>Relatório de Pagamentos</h2>
      <table className="tabela-pagamentos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data</th>
            <th>Método</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {pagamentos.map((pagamento) => (
            <tr key={pagamento.id}>
              <td>{pagamento.id}</td>
              <td>{pagamento.nome}</td>
              <td>{pagamento.data}</td>
              <td>{pagamento.metodo}</td>
              <td>R$ {pagamento.valor.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total">
        <strong>Total:</strong> R$ {totalPagamentos.toFixed(2)}
      </div>
    </div>
  );
};

export default RelatorioPagamentos;
