import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <Link to="/" className="back-button">←</Link>
        <h1>Mi Perfil</h1>
        <div style={{ width: '24px' }}></div>
      </header>
      <main className="profile-details">
        <div className="profile-info">
          <img src="https://i.postimg.cc/8fR2yC7Y/profile-image.jpg" alt="Profile" />
          <div className="profile-text">
            <h2>Juan Pérez</h2>
            <p>juan.perez@example.com</p>
          </div>
        </div>
        <div className="profile-options">
          <Link to="/profile/orders" className="profile-option-item">Mis Pedidos</Link>
          <Link to="/profile/payment-methods" className="profile-option-item">Métodos de Pago</Link>
          <Link to="/profile/addresses" className="profile-option-item">Mis Direcciones</Link>
          <Link to="/profile/settings" className="profile-option-item">Configuración</Link>
        </div>
        <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      </main>
    </div>
  );
}

export default Profile;
