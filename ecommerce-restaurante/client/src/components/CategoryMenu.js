import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './CategoryMenu.css';

function CategoryMenu() {
  const { categoryName } = useParams();
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    fetch('http://localhost:3001/api/productos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const formattedCategoryName = categoryName.replace('-', ' ');
        const filteredItems = data.filter(item => item.category.toLowerCase() === formattedCategoryName.toLowerCase());
        setItems(filteredItems);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [categoryName]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

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
        <span role="img" aria-label="cart">🛒</span> <span className="cart-count">{cart.length}</span>
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
