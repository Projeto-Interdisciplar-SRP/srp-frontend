import React from "react";
import "../styles/Ajuda.css"; // Estilos extraídos do CSS inline para arquivo separado
import Header from "./utilizavel/Header";

export default function Ajuda(){
    return(
        <div className="container">
            <Header which="usuario" />
  <section className="sobre-servico">
    <h2>Sobre o Serviço</h2>
    <p>
      <strong>O qu oferecemos:</strong> <br /> Viagens religiosas para AparecclassNamea do Norte.
    </p>
    <h3>Paróquias de saída:</h3>
    <ul>
      <li>
        <strong>Paróquia São Pedro:</strong> <br /> Endereço, pontos de referência, horário de funcionamento.
      </li>
      <li>
        <strong>Paróquia São Paulo Costa:</strong> <br /> Endereço, pontos de referência, horário de funcionamento.
      </li>
      <li>
        <strong>Paróquia São Benedito:</strong> <br /> Endereço, pontos de referência, horário de funcionamento.
      </li>
    </ul>

    <h2>Como Comprar Passagens</h2>
    <ol>
      <li>Na página inicial selecione a data e paróquia desejada.</li>
      <li>Preencha suas informações e a de passageiros adicionais se for o caso.</li>
      <li>Escolha o método de pagamento: cartão ou PIX.</li>
      <li>Consulte seu comprovante na aba de viagens.</li>
    </ol>


    <h2>Informações sobre a Viagem</h2>
    <ul>
      <li>
        <strong>Horários de saída:</strong> <br /> Consulte a tabela para cada paróquia.
      </li>
      <li>
        <strong>Ponto de encontro:</strong>
        <br /> Informe-se com a sua paróquia.
      </li>
      <li>
        <strong>Bagagem:</strong>
        <br /> Limite permitclassNameo: 1 mala e 1 mochila.
      </li>
      <li>
        <strong>Regras durante a viagem:</strong> <br />
        Siga as orientações do guia.
      </li>
    </ul>

    <h2>Política de Cancelamento e Reembolso</h2>
    <p>
      <strong>Cancelamento:</strong> Pode ser solicitado com até 48 horas de antecedência.
    </p>
    <p>
      <strong>Reembolso:</strong> Envie um e-mail para suporte com o número da reserva.
    </p>

    <h2>DúvclassNameas Frequentes (FAQ)</h2>
    <ul>
      <li>
        <strong>Posso reservar vários lugares no mesmo pedclassNameo?</strong> <br />
        Sim, basta informar os dados pedclassNameos na hora de adicionar passageiro.
      </li>
      <li>
        <strong>Crianças precisam de passagem?</strong>
        <br /> Sim, todas precisam de passagem indivclassNameual.
      </li>
      <li>
        <strong>E se eu me atrasar para o embarque?</strong> <br />O ônibus não aguardará atrasos.
      </li>
      <li>
        <strong>O ônibus faz paradas durante o trajeto?</strong> <br />
        Não, o ônibus segue o trajeto direto para o destino.
      </li>
    </ul>
    </section>
  </div>
    );
}
