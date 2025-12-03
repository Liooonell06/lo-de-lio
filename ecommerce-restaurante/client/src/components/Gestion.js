import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Gestion.css';

function Gestion() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    // Fetch sales history
    fetch('http://localhost:3001/api/ventas')
      .then(response => response.json())
      .then(data => setVentas(data))
      .catch(error => console.error('Error fetching ventas:', error));

    // Fetch products
    fetch('http://localhost:3001/api/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error fetching productos:', error));
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
      .then(response => response.json())
      .then(data => {
        setProductos([...productos, data]);
        setNewProduct({ name: '', price: '', description: '', category: '', image: '' });
      })
      .catch(error => console.error('Error adding product:', error));
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:3001/api/productos/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setProductos(productos.filter(product => product.id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div className="gestion">
      <header className="gestion-header">
        <Link to="/" className="back-button">←</Link>
        <h1>Panel de Gestión</h1>
      </header>

      <div className="gestion-content">
        <section className="ventas-section">
          <h2>Historial de Ventas</h2>
          <table className="ventas-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map(venta => (
                <tr key={venta.id}>
                  <td>{venta.id}</td>
                  <td>{venta.fecha}</td>
                  <td>${venta.total}</td>
                  <td>{venta.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="productos-section">
          <h2>Gestión de Productos</h2>
          <form onSubmit={handleAddProduct} className="add-product-form">
            <input
              type="text"
              placeholder="Nombre"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Precio"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Descripción"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Categoría"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Imagen URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              required
            />
            <button type="submit">Agregar Producto</button>
          </form>

          <div className="productos-list">
            {productos.map(product => (
              <div key={product.id} className="producto-item">
                <img src={product.image} alt={product.name} />
                <div>
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                </div>
                <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


export default Gestion;
                                                                                                                                                        