        import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dni, password })
      });
      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(true);
        if (data.user && data.user.rol === 'admin') {
          navigate('/gestion');
        } else {
          navigate('/carrito-principal');
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleLogin}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="dni">DNI</label>
            <input 
              type="number" 
              id="dni" 
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="login-button">Entrar</button>
        </form>
        <p className="signup-link">
          ¿No tienes una cuenta? <Link to="/signup">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
