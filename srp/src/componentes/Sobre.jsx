import React from 'react';
import '../styles/Sobre.css'; // Adicione o estilo separado para melhor organização
import Header from './utilizavel/Header';


const SobreNos = () => {
  const desenvolvedores = [
    {
      nome: 'Isaias Belarmina',
      funcao: 'Product Owner & Front-end',
      img: 'https://via.placeholder.com/80',
      link: '#',
      altLink: 'LinkedIn',
    },
    {
      nome: 'Camille Alves',
      funcao: 'Scrum Master, UI/UX & Front-end',
      img: 'https://via.placeholder.com/80',
      link: '#',
      altLink: 'LinkedIn',
    },
    {
      nome: 'Gustavo Henrique',
      funcao: 'Banco de Dados',
      img: 'https://via.placeholder.com/80',
      link: '#',
      altLink: 'LinkedIn',
    },
    {
      nome: 'Victor Daniel',
      funcao: 'Back-end',
      img: 'https://via.placeholder.com/80',
      link: '#',
      altLink: 'GitHub',
    },
    {
      nome: 'Arthur Soares',
      funcao: 'Banco de Dados',
      img: 'https://via.placeholder.com/80',
      link: '#',
      altLink: 'LinkedIn',
    },
  ];

  return (
    <div className="container">
        <Header which="usuario"/>
    <main>

      <h1>Sobre Nós</h1>
      <section className="about">
        <p>Bem-vindo à SRP!</p>
        <p>
          Somos uma empresa dedicada a conectar a fé e a devoção de milhares de peregrinos às bênçãos de Nossa Senhora
          Aparecida. Desde nossa fundação, temos o compromisso de oferecer uma experiência de viagem segura, confortável
          e especial para grupos religiosos de todas as idades.
        </p>
        <p>
          Nosso objetivo é facilitar o transporte de paróquias de diferentes regiões do Brasil até o Santuário Nacional
          de Aparecida, um dos maiores centros de devoção mariana do mundo. Sabemos que esta viagem é mais do que um
          deslocamento: é uma jornada espiritual que fortalece a fé, a comunhão e a esperança.
        </p>
        <h2>Por que escolher nossos serviços?</h2>
        <ul>
          <li>
            <strong>Segurança e conforto:</strong> Nossos ônibus são equipados com os melhores recursos para garantir
            uma viagem tranquila, incluindo ar-condicionado, poltronas reclináveis e motoristas experientes.
          </li>
          <li>
            <strong>Planejamento personalizado:</strong> Trabalhamos diretamente com sua paróquia para organizar roteiros
            que atendam às necessidades do grupo.
          </li>
          <li>
            <strong>Experiência espiritual:</strong> Durante a viagem, disponibilizamos momentos para orações, músicas e
            reflexões, para que a jornada seja uma extensão da sua devoção.
          </li>
          <li>
            <strong>Compromisso com a fé:</strong> Entendemos a importância desse momento e estamos aqui para tornar sua
            experiência ainda mais especial.
          </li>
        </ul>
        <h2>Nossa missão</h2>
        <p>Conectar pessoas à sua fé, proporcionando uma jornada segura e acolhedora rumo ao encontro com Nossa Senhora Aparecida.</p>

        <h2>Desenvolvedores</h2>
        <div className="developer-grid">
          {desenvolvedores.map((dev, index) => (
            <div key={index} className="developer-card">
              <img src={dev.img} alt={dev.nome} />
              <h3>{dev.nome}</h3>
              <p>{dev.funcao}</p>
              <a href={dev.link}>
                <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt={dev.altLink} />
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
    </div>
  );
};

export default SobreNos;