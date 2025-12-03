import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/auth');
  };

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Lo de Lio</h1>
          <h2>Especialistas en rabas y calamar</h2>
          <p>Sabor marino en cada bocado, desde la comodidad de tu hogar</p>
          <button className="start-button" onClick={handleStart}>
            Explorar Menú
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;