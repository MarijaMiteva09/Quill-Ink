import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:3001/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
        navigate('/login');
      }
    };

    fetchCart();
  }, [navigate]);

  const removeFromCart = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:3001/cart/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setCart(cart.filter(book => book.bookId !== bookId));
      }
    } catch (error) {
      console.error('Error removing book from cart:', error);
      alert('Failed to remove book from cart.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <ul className="list-group">
          {cart.map((book) => (
            <li key={book.bookId} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <img src={book.thumbnail} alt={book.title} className="img-thumbnail" style={{ width: '50px', marginRight: '10px' }} />
                {book.title} by {book.authors}
              </div>
              <button className="btn btn-danger" onClick={() => removeFromCart(book.bookId)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
