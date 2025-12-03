import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    password: '',
    dni: '',
    rol: 'cliente'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('Registro exitoso! Ahora puedes iniciar sesión.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Crear Cuenta</h1>
        <form onSubmit={handleSignUp}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input 
              type="text" 
              id="apellido" 
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="dni">DNI</label>
            <input 
              type="number" 
              id="dni" 
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="rol">Rol</label>
            <select 
              id="rol" 
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              required
            >
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <button type="submit" className="signup-button">Registrarse</button>
        </form>
        <p className="login-link">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
