import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import './ShoppingCart.css';

function ShoppingCart() {
  const { cart, updateQuantity, getTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const submitOrder = async () => {
    if (cart.length === 0) return;

    setIsSubmitting(true);
    try {
      // Create order
      const total = getTotal() + 30; // including shipping
      const orderResponse = await fetch('http://localhost:5000/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_mesa: null, // no table assigned
          total: total,
          estado: 'Pendiente'
        }),
      });

      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();
        throw new Error(`Failed to create order: ${errorText}`);
      }

      const orderData = await orderResponse.json();
      const orderId = orderData.id_pedido;

      // Add order details
      for (const item of cart) {
        const subtotal = item.price * item.quantity;
        await fetch('http://localhost:5000/api/pedido_detalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_pedido: orderId,
            id_producto: item.id,
            cantidad: item.quantity,
            subtotal: subtotal,
          }),
        });
      }

      // Clear cart and navigate to confirmation
      clearCart();
      navigate('/checkout');
    } catch (error) {
      console.error('Error submitting order:', error);
      // alert('Error al procesar el pedido. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="diner-card">
            <div className="diner-header">
              <h3>Tu Pedido</h3>
            </div>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <div className="item-quantity">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/main-menu">
              <button className="customize-order-btn">Agregar más productos</button>
            </Link>
          </div>
        </div>

        <div className="order-summary">
          <h2>Resumen de la Orden</h2>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Costo de envío</span>
            <span>$30.00</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${(getTotal() + 30).toFixed(2)}</span>
          </div>
        </div>

        <button
          className="checkout-button"
          onClick={submitOrder}
          disabled={isSubmitting || cart.length === 0}
        >
          {isSubmitting ? 'Procesando...' : 'Continuar con el Pago'}
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
