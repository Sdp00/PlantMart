// src/Landing.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to PlantMart</h1>
        <p style={styles.subtitle}>Greenery for every space</p>

        <div style={styles.buttonContainer}>
          {!isLoggedIn && (
            <>
              <button style={styles.button} onClick={() => navigate('/login')}>
                Login
              </button>
              <button style={styles.button} onClick={() => navigate('/register')}>
                Register
              </button>
            </>
          )}
          <button style={styles.button} onClick={() => alert('Learn more content goes here!')}>
            Learn More
          </button>

          {isLoggedIn && (
            <button
              style={{ ...styles.button, backgroundColor: '#28a745' }}
              onClick={() => navigate('/products')}
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(135deg, #c1dfc4, #deecdd)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: '3rem',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    color: '#333',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: '#555',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  button: {
    padding: '1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#615EFC',
    color: '#fff',
  },
};

export default Landing;
