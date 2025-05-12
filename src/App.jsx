import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import Login from './Login';
import Register from './Register';
import Checkout from './Checkout';
import LearnMore from './LearnMore';
import CartItem from './CartItem';  // Import the CartItem component
import './App.css';

function Home() {
  const [showProductList, setShowProductList] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
  }, []);

  const handleGetStartedClick = () => {
    if (!isLoggedIn) {
      alert("Please login first!");
      navigate('/login');
    } else {
      setShowProductList(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    alert('Logged out successfully!');
  };

  const handleReturnClick = () => {
    setShowProductList(false);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page simple-layout">
          <h1>Welcome to PlantMart</h1>
          <p style={{ marginBottom: '2rem' }}>Bringing nature to your doorstep.</p>

          {!isLoggedIn ? (
            <div className="button-group">
              <Link to="/login"><button className="landing-btn">Login</button></Link>
              <Link to="/register"><button className="landing-btn">Register</button></Link>
              <Link to="/learn-more"><button className="landing-btn">Learn More</button></Link>
            </div>
          ) : (
            <div className="button-group">
              <button className="landing-btn" onClick={handleGetStartedClick}>Get Started</button>
              <button className="landing-btn" onClick={handleLogout}>Logout</button>
              <Link to="/learn-more"><button className="landing-btn">Learn More</button></Link>
            </div>
          )}
        </div>
      ) : (
        <div className="product-list-container visible">
          <ProductList toLanding={handleReturnClick} />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/cart" element={<CartItem />} />  {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
