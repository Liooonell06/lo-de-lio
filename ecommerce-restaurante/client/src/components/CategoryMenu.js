import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../CartContext';
import './CategoryMenu.css';

function CategoryMenu() {
  const { categoryName } = useParams();
  const { addToCart, getCartCount } = useCart();
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    fetch('http://localhost:5000/api/productos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const formattedCategoryName = categoryName.replace('-', ' ');
        const filteredItems = data.filter(item => item.category.toLowerCase() === formattedCategoryName.toLowerCase());
        if (filteredItems.length > 0) {
          setItems(filteredItems);
        } else {
          // Fallback hardcoded data
          const fallbackData = {
            'rabas-aperitivos': [
              { id: 1, name: 'Anillos de Calamar', description: 'Crujientes anillos de calamar', price: 120, image: '/images/Gemini_Generated_Image_c7zornc7zornc7zo (2).png', category: 'Rabas Aperitivos' },
              { id: 2, name: 'Ensalada de Calamar', description: 'Fresca ensalada con calamar', price: 85, image: '/images/Gemini_Generated_Image_c7zornc7zornc7zo.png', category: 'Rabas Aperitivos' },
              { id: 11, name: 'Pulpo al Ajillo', description: 'Pulpo con ajo y aceite de oliva', price: 130, image: '/images/ceviche-plato-mar-chuparse-dedos-3f97f6199d6a09e16d9e5efa3e9839b5.jpg', category: 'Rabas Aperitivos' }
            ],
            'platos-calamar': [
              { id: 3, name: 'Pasta con Tinta de Calamar', description: 'Pasta negra con tinta', price: 150, image: '/images/ceviche-plato-mar-chuparse-dedos-3f97f6199d6a09e16d9e5efa3e9839b5.jpg', category: 'Platos de Calamar' },
              { id: 4, name: 'Calamar a la Plancha', description: 'Calamar fresco a la plancha', price: 140, image: '/images/calamaralaplancha.jpg', category: 'Platos de Calamar' },
              { id: 5, name: 'Paella de Calamar', description: 'Paella tradicional con calamar', price: 160, image: '/images/Gemini_Generated_Image_c7zornc7zornc7zo.png', category: 'Platos de Calamar' },
              { id: 6, name: 'Calamar en su Tinta', description: 'Calamar cocinado en su propia tinta', price: 155, image: '/images/ceviche-plato-mar-chuparse-dedos-3f97f6199d6a09e16d9e5efa3e9839b5.jpg', category: 'Platos de Calamar' }
            ],
            'postres': [
              { id: 5, name: 'Tiramisú de Mariscos', description: 'Postre con mariscos', price: 80, image: '/images/Gemini_Generated_Image_c7zornc7zornc7zo (2).png', category: 'Postres' },
              { id: 6, name: 'Helado de Vainilla', description: 'Helado cremoso', price: 60, image: '/images/Gemini_Generated_Image_c7zornc7zornc7zo.png', category: 'Postres' }
            ],
            'bebidas': [
              { id: 7, name: 'Agua Marina', description: 'Agua mineral', price: 30, image: '/images/Agua-Jamaica-Y-Horchata.png', category: 'Bebidas' },
              { id: 8, name: 'Limonada Fresca', description: 'Limonada natural', price: 40, image: '/images/Gemini_Generated_Image_c7zornc7zornc7zo (1).png', category: 'Bebidas' }
            ],
            'bocadillos': [
              { id: 9, name: 'Calamar Frito', description: 'Calamar frito crujiente', price: 100, image: '/images/Gemini_Generated_Image_c7zornc7zornc7zo (2).png', category: 'Bocadillos' },
              { id: 10, name: 'Ceviche de Calamar', description: 'Ceviche fresco', price: 110, image: '/images/ceviche-plato-mar-chuparse-dedos-3f97f6199d6a09e16d9e5efa3e9839b5.jpg', category: 'Bocadillos' }
            ]
          };
          setItems(fallbackData[categoryName] || []);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Fallback hardcoded data on error
        const fallbackData = {
          'rabas-aperitivos': [
            { id: 1, name: 'Anillos de Calamar', description: 'Crujientes anillos de calamar', price: 120, image: '/images/Gemini_Generated_Image_c7zornc7zornc7zo (2).png', category: 'Rabas Aperitivos' },
            { id: 2, name: 'Ensalada de Calamar', description: 'Fresca ensalada con calamar', price: 85, image: '/images/ceviche-plato-mar-chuparse-dedos-3f97f6199d6a09e16d9e5efa3e9839b5.jpg', category: 'Rabas Aperitivos' },
            { id: 11, name: 'Pulpo al Ajillo', description: 'Pulpo con ajo y aceite de oliva', price: 130, image: '/images/Gemini_Generated_Image_c7zornc7zornc7zo.png', category: 'Rabas Aperitivos' }
          ],
          'platos-calamar': [
            { id: 3, name: 'Pasta con Tinta de Calamar', description: 'Pasta negra con tinta', price: 150, image: '/images/ceviche-plato-mar-chuparse-dedos-3f97f6199d6a09e16d9e5efa3e9839b5.jpg', category: 'Platos de Calamar' },
            { id: 4, name: 'Calamar a la Plancha', description: 'Calamar fresco a la plancha', price: 140, image: '/images/calamaralaplancha.jpg', category: 'Platos de Calamar' },
            { id: 5, name: 'Paella de Calamar', description: 'Paella tradicional con calamar', price: 160, image: '/images/Gemini_Generated_Image_c7zornc7zornc7zo.png', category: 'Platos de Calamar' },
            { id: 6, name: 'Calamar en su Tinta', description: 'Calamar cocinado en su propia tinta', price: 155, image: '/images/ceviche-plato-mar-chuparse-dedos-3f97f6199d6a09e16d9e5efa3e9839b5.jpg', category: 'Platos de Calamar' }
          ],
          'postres': [
            { id: 5, name: 'Tiramisú de Mariscos', description: 'Postre con mariscos', price: 80, image: '/images/Gemini_Generated_Image_c7zornc7zornc7zo (2).png', category: 'Postres' },
            { id: 6, name: 'Helado de Vainilla', description: 'Helado cremoso', price: 60, image: '/images/Agua-Jamaica-Y-Horchata.png', category: 'Postres' }
          ],
          'bebidas': [
            { id: 7, name: 'Agua Marina', description: 'Agua mineral', price: 30, image: '/images/Agua-Jamaica-Y-Horchata.png', category: 'Bebidas' },
            { id: 8, name: 'Limonada Fresca', description: 'Limonada natural', price: 40, image: '/images/ceviche-plato-mar-chuparse-dedos-3f97f6199d6a09e16d9e5efa3e9839b5.jpg', category: 'Bebidas' }
          ],
          'bocadillos': [
            { id: 9, name: 'Calamar Frito', description: 'Calamar frito crujiente', price: 100, image: '/images/Gemini_Generated_Image_c7zornc7zornc7zo (2).png', category: 'Bocadillos' },
            { id: 10, name: 'Ceviche de Calamar', description: 'Ceviche fresco', price: 110, image: '/images/ceviche-plato-mar-chuparse-dedos-3f97f6199d6a09e16d9e5efa3e9839b5.jpg', category: 'Bocadillos' }
          ]
        };
        setItems(fallbackData[categoryName] || []);
      });
  }, [categoryName]);


  const getSortedItems = () => {
    const sorted = [...items];
    if (sortOrder === 'asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  };

  return (
    <div className="category-menu-page">
      <header className="category-menu-header">
        <Link to="/menu" className="back-button">←</Link>
        <h1>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1).replace('-', ' ')}</h1>
        <Link to="/carrito-principal" className="cart-button">
        <span role="img" aria-label="cart">🛒</span> <span className="cart-count">{getCartCount()}</span>
        </Link>
      </header>
      <div className="controls-bar">
        <div className="sort-options">
          <label htmlFor="sort">Ordenar por:</label>
          <select id="sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="default">Seleccionar</option>
            <option value="asc">Precio: Menor a Mayor</option>
            <option value="desc">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>
      <main className="category-menu-items">
        {getSortedItems().map((item) => (
          <div className="category-menu-item" key={item.id}>
            <Link to={`/product/${item.id}`}>
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p className="item-price">${parseFloat(item.price).toFixed(2)}</p>
              </div>
            </Link>
            <button className="add-button" onClick={() => addToCart(item)}>+</button>
          </div>
        ))}
      </main>
      <footer className="category-menu-footer">
        <Link to="/carrito-principal" className="view-cart-button">Ver Carrito</Link>
      </footer>
    </div>
  );
}

export default CategoryMenu;
