import React from 'react';
import './TableSetup.css';

function TableSetup({ guestCount, setGuestCount, onConfirm }) {
  const increment = () => setGuestCount(prev => prev + 1);
  const decrement = () => setGuestCount(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="table-setup-overlay">
      <div className="table-setup-modal">
        <h2>¿Cuántos son?</h2>
        <p>Selecciona el número de personas en la mesa.</p>
        <div className="guest-counter">
          <button onClick={decrement}>-</button>
          <span>{guestCount}</span>
          <button onClick={increment}>+</button>
        </div>
        <button className="confirm-button" onClick={onConfirm}>
          Confirmar
        </button>
      </div>
    </div>
  );
}

export default TableSetup;
