import React from 'react';
import { Link } from 'react-router-dom';
import './ConfirmationPayment.css';

function ConfirmationPayment() {
  return (
    <div className="confirmation-payment">
      <div className="confirmation-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ff8c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h1>¡Pedido Confirmado!</h1>
      <p>Tu orden ha sido procesada y estará en camino pronto.</p>
      <div className="order-number">
        <span>Número de Orden</span>
        <strong>#123456</strong>
      </div>
      <Link to="/">
        <button className="home-button">Volver al Inicio</button>
      </Link>
    </div>
  );
}

export default ConfirmationPayment;
