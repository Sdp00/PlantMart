import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CreateSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Safely calculate total amount by handling cost format issues
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const itemCost = item.cost && item.cost.startsWith('$') 
        ? Number(item.cost.substring(1)) 
        : 0; // Default to 0 if the cost is not valid
      return total + itemCost * item.quantity;
    }, 0);
  };

  const handleContinueShopping = () => {
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Safely calculate total cost for each item
  const calculateTotalCost = (item) => {
    const itemCost = item.cost && item.cost.startsWith('$')
      ? Number(item.cost.substring(1))
      : 0; // Default to 0 if the cost is not valid
    return itemCost * item.quantity;
  };

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <h2 style={{ color: 'black' }}>Your cart is empty!</h2>
      ) : (
        <>
          <h2 style={{ color: 'black' }}>Total Plants: {cart.length}</h2>
          <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
          <div>
            {cart.map(item => (
              <div className="cart-item" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">{item.cost}</div>
                  <div className="cart-item-quantity">
                    <button 
                      className="cart-item-button cart-item-button-dec" 
                      onClick={() => handleDecrement(item)}
                    >
                      -
                    </button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button 
                      className="cart-item-button cart-item-button-inc" 
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    Total: ${calculateTotalCost(item)}
                  </div>
                  <button 
                    className="cart-item-delete" 
                    onClick={() => handleRemove(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button 
          className="get-started-button1" 
          disabled={cart.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
