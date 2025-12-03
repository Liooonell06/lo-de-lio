import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ShoppingCart.css';

function ShoppingCart() {
  const [diners, setDiners] = useState([
    {
      id: 1,
      items: [
        {
          id: 1,
          name: 'Platito de Rabas',
          price: 120.00,
          image: '/images/Gemini_Generated_Image_2b6hmt2b6hmt2b6h.png',
          quantity: 1
        }
      ]
    }
  ]);

  const addDiner = () => {
    const newDiner = {
      id: diners.length + 1,
      items: []
    };
    setDiners([...diners, newDiner]);
  };

  const deleteDiner = (id) => {
    if (diners.length > 1) {
      setDiners(diners.filter(diner => diner.id !== id));
    }
  };

  const calculateTotal = () => {
    return diners.reduce((total, diner) => {
      return total + diner.items.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
    }, 0);
  };

  return (
    <div className="shopping-cart">
      <div className="cart-container">
        <header className="cart-header">
          <Link to="/" className="back-button">←</Link>
          <h1>Carrito Principal</h1>
          <div style={{ width: '24px' }}></div>
        </header>

        <div className="carrito-section">
          {diners.map((diner, index) => (
            <div key={diner.id} className="diner-card">
              <div className="diner-header">
                <h3>Comensal {diner.id}</h3>
                {diners.length > 1 && (
                  <button className="delete-diner" onClick={() => deleteDiner(diner.id)}>×</button>
                )}
              </div>
              <div className="cart-items">
                {diner.items.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                    <div className="item-quantity">
                      <button>-</button>
                      <span>{item.quantity}</span>
                      <button>+</button>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/main-menu">
                <button className="customize-order-btn">Personalizar pedido</button>
              </Link>
            </div>
          ))}
          <button className="add-diner-button" onClick={addDiner}>+</button>
        </div>

        <div className="order-summary">
          <h2>Resumen de la Orden</h2>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Costo de envío</span>
            <span>$30.00</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${(calculateTotal() + 30).toFixed(2)}</span>
          </div>
        </div>

        <Link to="/checkout">
          <button className="checkout-button">Continuar con el Pago</button>
        </Link>
      </div>
    </div>
  );
}

export default ShoppingCart;
