import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [cartItems, setCartItems] = useState([]);

  // Check if the user is logged in
  useEffect(() => {
    if (!isLoggedIn) {
      alert('Please log in to continue to checkout.');
      navigate('/login');
    }

    // Load cart items from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, [isLoggedIn, navigate]);

  // Don't render anything while redirecting
  if (!isLoggedIn) return null;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Checkout</h2>

      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, idx) => (
            <li key={idx}>
              {item.name} — {item.quantity} × ₹{item.cost}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <button
        onClick={() => {
          alert('Order placed successfully!');
          localStorage.removeItem('cart'); // clear the cart after order
          navigate('/'); // redirect to home after placing order
        }}
        style={{ marginTop: '1rem' }}
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
