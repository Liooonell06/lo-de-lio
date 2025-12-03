import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import MainMenu from './components/MainMenu';
import Menu from './components/Menu';
import Profile from './components/Profile';
import ProductDetail from './components/ProductDetail';
import ShoppingCart from './components/ShoppingCart';
import ConfirmationPayment from './components/ConfirmationPayment';
import Login from './components/Login';
import SignUp from './components/SignUp';
import CategoryMenu from './components/CategoryMenu';
import Gestion from './components/Gestion';

// Los productos ahora se obtienen dinámicamente desde la API

function ProductDetailWrapper() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/productos/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return <ProductDetail product={product} />;
}

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/main-menu" element={<MainMenu />} />
        <Route path="/category/:categoryName" element={<CategoryMenu />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile setIsAuthenticated={setIsAuthenticated} />
            </ProtectedRoute>
          }
        />
        <Route path="/product/:id" element={<ProductDetailWrapper />} />
        <Route path="/product-detail/:id" element={<ProductDetailWrapper />} />
        <Route path="/carrito-principal" element={<ShoppingCart />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/checkout" element={<ConfirmationPayment />} />
      </Routes>
    </Router>
  );
}

export default App;
