import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import './Menu.css';

function Menu() {
  const { cart, updateQuantity, getTotal } = useCart();
  const categories = [
    {
      name: 'Rabas y Aperitivos',
      link: '/category/rabas-aperitivos',
      image: '/images/Gemini_Generated_Image_c7zornc7zornc7zo (2).png',
      characteristics: ['Porciones pequeñas', 'Perfectas para compartir', 'Sabores del mar'],
      dishes: ['Anillos de Calamar', 'Ensalada de Calamar', 'Pulpo a la Gallega']
    },
    {
      name: 'Platos de Calamar',
      link: '/category/platos-calamar',
      image: '/images/ceviche-plato-mar-chuparse-dedos-3f97f6199d6a09e16d9e5efa3e9839b5.jpg',
      characteristics: ['Porciones generosas', 'Ingredientes frescos', 'Recetas marinas'],
      dishes: ['Pasta con Tinta de Calamar', 'Calamar a la Plancha', 'Guiso de Calamar']
    },
    {
      name: 'Postres',
      link: '/category/postres',
      image: '/images/Gemini_Generated_Image_c7zornc7zornc7zo (2).png',
      characteristics: ['Dulces tradicionales', 'Preparados al momento', 'Sabores únicos'],
      dishes: ['Tiramisú de Mariscos', 'Helado de Vainilla con Salsa de Caramelo', 'Frutas Frescas']
    },
    {
      name: 'Bebidas',
      link: '/category/bebidas',
      image: '/images/Agua-Jamaica-Y-Horchata.png',
      characteristics: ['Bebidas naturales', 'Refrescantes', 'Sin conservadores'],
      dishes: ['Agua Marina', 'Limonada Fresca', 'Cóctel de Mariscos']
    },
    {
      name: 'Bocadillos',
      link: '/category/bocadillos',
      image: '/images/Gemini_Generated_Image_c7zornc7zornc7zo (2).png',
      characteristics: ['Bocadillos marinos', 'Perfectos para picar', 'Sabores frescos'],
      dishes: ['Calamar Frito', 'Ceviche de Calamar', 'Tartar de Pulpo']
    }
  ];


  return (
    <div className="menu-page">
      <header className="menu-header">
        <Link to="/carrito-principal" className="logout-button">Volver al carrito</Link>
        <Link to="/carrito-principal" className="cart-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.42-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </Link>
      </header>
      <main className="menu-grid-container">
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className={`category-card ${category.name === 'Platos Principales' ? 'platos-principales' : ''}`}>
              {category.image && <img src={category.image} alt={category.name} className="category-image" />}
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

        <div className="cart-section">
           <h2>🛒 Tu Pedido</h2>
           <div className="cart-items">
             {cart.map((item, index) => (
               <div key={item.id || index} className="cart-item">
                 <img src={item.image} alt={item.name} />
                 <div className="item-info">
                   <h4>{item.name}</h4>
                   <span className="item-price">${item.price}.00</span>
                 </div>
                 <div className="quantity-controls">
                   <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                   <span>{item.quantity}</span>
                   <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                 </div>
               </div>
             ))}
           </div>
           <div className="cart-total">
             <div className="total-line">
               <span>Total: <strong>${getTotal().toFixed(2)}</strong></span>
             </div>
             <Link to="/carrito-principal" className="checkout-btn">Finalizar Pedido</Link>
           </div>
         </div>

      </main>
    </div>
  );
}

export default Menu;
