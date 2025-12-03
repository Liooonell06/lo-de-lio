import React from 'react';
import { Link } from 'react-router-dom';
import './ProductDetail.css';

// Función auxiliar para formatear precio
const formatPrice = (price) => {
  return `$${parseFloat(price).toFixed(2)} MXN`;
};

function ProductDetail({ product }) {
  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="product-detail">
      <header className="product-header">
        <Link to="/" className="back-button">←</Link>
        <button className="favorite-button">♡</button>
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
          <label htmlFor="spiciness">Nivel de Picante</label>
          <select id="spiciness" defaultValue="medio">
            <option value="bajo">Bajo</option>
            <option value="medio">Medio</option>
            <option value="alto">Alto</option>
          </select>

          <label>Tortillas</label>
          <div className="tortilla-options">
            <button className="active">Maiz</button>
            <button>Harina</button>
          </div>
        </div>

        <Link to="/carrito-principal">
          <button className="add-to-cart-button">Agregar al carrito</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;
