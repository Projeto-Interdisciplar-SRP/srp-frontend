import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Sobre Nós</h4>
          <p>Somos uma empresa dedicada a oferecer a melhor experiência em viagens.</p>
        </div>
        
        <div className="footer-section">
          <h4>Contato</h4>
          <p>Telefone: (11) 1234-5678</p>
          <p>Email: contato@exemplo.com</p>
        </div>
        
        <div className="footer-section">
          <h4>Links Úteis</h4>
          <ul>
            <li><a href="/ajuda">Ajuda</a></li>
            <li><a href="/politica-de-privacidade">Política de Privacidade</a></li>
            <li><a href="/termos-de-uso">Termos de Uso</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Todos os direitos reservados | Exemplo de Empresa</p>
      </div>
    </footer>
  );
};

export default Footer;
