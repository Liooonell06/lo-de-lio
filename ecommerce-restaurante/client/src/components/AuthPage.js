import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

function AuthPage({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [displayLogin, setDisplayLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    nombre: '', 
    apellido: '', 
    DNI: '', 
    password: '', 
    rol: 'cliente' 
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (displayLogin) {
      try {
        const response = await fetch('http://localhost:5000/api/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'login', dni: formData.DNI, password: formData.password })
        });
        const data = await response.json();
        if (data.success) {
          setIsAuthenticated(true);
          navigate('/main-menu');
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Error de conexión');
      }
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'register', ...formData, dni: formData.DNI })
        });
        const data = await response.json();
        if (data.success) {
          setSuccess('Registro exitoso! Ahora puedes iniciar sesión.');
          setTimeout(() => {
            setIsLogin(true);
            setDisplayLogin(true);
            setFormData({ nombre: '', apellido: '', DNI: '', password: '', rol: 'cliente' });
            setSuccess('');
          }, 2000);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Error de conexión');
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ nombre: '', apellido: '', DNI: '', password: '', rol: 'cliente' });
    setError('');
    setSuccess('');
  };

  return (
    <div className="auth-page">
      <div className="info-section">
        <h1>Bienvenido a Lo de Lio</h1>
        <p>Especialistas en rabas y calamar</p>
        <button
          className="switch-button"
          onClick={() => {
            setDisplayLogin(!displayLogin);
            resetForm();
          }}
        >
          {displayLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
        </button>

        <form onSubmit={handleSubmit}>
          <h2>{displayLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {!displayLogin && (
            <>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                required
              />
            </>
          )}

          <input
            type="number"
            name="DNI"
            placeholder="DNI"
            value={formData.DNI}
            onChange={handleInputChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          {!displayLogin && (
            <select
              name="rol"
              value={formData.rol}
              onChange={handleInputChange}
              required
            >
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
          )}

          <button type="submit">
            {displayLogin ? 'Entrar' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;