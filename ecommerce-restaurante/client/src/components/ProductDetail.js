import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import './ProductDetail.css';

// Función auxiliar para formatear precio
const formatPrice = (price) => {
  return `$${parseFloat(price).toFixed(2)} usd`;
};

function ProductDetail({ product }) {
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="product-detail">
      <header className="product-header">
        <button onClick={() => navigate(-1)} className="back-button">←</button>
        <h1>{product.name}</h1>
        <Link to="/carrito-principal" className="cart-button">
          <span role="img" aria-label="cart">🛒</span> <span className="cart-count">{getCartCount()}</span>
        </Link>
      </header>

      <img src={product.image} alt={product.name} className="product-image" />

      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">{formatPrice(product.price)}</p>
        <p className="description">{product.description}</p>

        <h2>Ingredientes</h2>
        <div className="ingredients">
          <p>Ingredientes no disponibles desde la API. Se pueden agregar en futuras versiones.</p>
        </div>

        <h2>Personaliza tu plato</h2>
        <div className="customization">
          {product.category.toLowerCase().includes('bebidas') ? (
            <>
              <label htmlFor="size">Tamaño</label>
              <select id="size" defaultValue="regular">
                <option value="pequeño">Pequeño</option>
                <option value="regular">Regular</option>
                <option value="grande">Grande</option>
              </select>
            </>
          ) : product.category.toLowerCase().includes('postres') ? (
            <>
              <label htmlFor="topping">Adicionales</label>
              <select id="topping" defaultValue="ninguno">
                <option value="ninguno">Ninguno</option>
                <option value="chocolate">Chocolate</option>
                <option value="caramelo">Caramelo</option>
                <option value="frutas">Frutas</option>
              </select>
            </>
          ) : null}
          <label htmlFor="special-instructions">Instrucciones especiales (opcional)</label>
          <textarea id="special-instructions" placeholder="Escribe aquí tus instrucciones especiales para el plato..."></textarea>
        </div>

        <Link to="/carrito-principal">
          <button className="add-to-cart-button">Agregar al carrito</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;
