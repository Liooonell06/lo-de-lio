import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {
  
  const categories = [
    {
      name: 'Rabas y Aperitivos',
      link: '/category/rabas-aperitivos',
      characteristics: ['Crujientes y deliciosas', 'Perfectas para empezar', 'Frescas del mar'],
      dishes: ['Rabas Fritas', 'Calamar a la Romana', 'Ensalada de Calamar', 'Pulpo al Ajillo']
    },
    {
      name: 'Platos de Calamar',
      link: '/category/platos-calamar',
      characteristics: ['Especialidades de calamar', 'Cocina tradicional', 'Sabores intensos'],
      dishes: ['Paella de Calamar', 'Calamar en su Tinta', 'Guiso de Calamar', 'Calamar Gigante']
    },
    {
      name: 'Postres Marinos',
      link: '/category/postres-marinos',
      characteristics: ['Dulces con toque marino', 'Preparados con amor', 'Final perfecto'],
      dishes: ['Tiramisú de Mariscos', 'Helado de Vainilla con Caramelo', 'Frutas Frescas', 'Flan de Coco']
    },
    {
      name: 'Bebidas Refrescantes',
      link: '/category/bebidas-refrescantes',
      characteristics: ['Bebidas naturales', 'Refrescantes', 'Acompañan perfecto'],
      dishes: ['Agua Marina', 'Limonada Fresca', 'Cóctel de Mariscos', 'Té Helado']
    }
  ];


  return (
    <div className="menu-page">
      <header className="menu-header">
        <Link to="/main-menu" className="logout-button">Volver al menú</Link>
        <h1>Menú</h1>
        <Link to="/carrito-principal" className="cart-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.42-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </Link>
      </header>
      <main className="menu-grid-container">
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <div className="category-content">
                <h2>{category.name}</h2>
                <div className="characteristics">
                  {category.characteristics.map((char, i) => (
                    <span key={i} className="characteristic">{char}</span>
                  ))}
                </div>
                <div className="sample-dishes">
                  <h3>Algunos platos:</h3>
                  <ul>
                    {category.dishes.map((dish, i) => (
                      <li key={i}>{dish}</li>
                    ))}
                  </ul>
                </div>
                <Link to={category.link} className="view-category-btn">
                  Ver {category.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Menu;
