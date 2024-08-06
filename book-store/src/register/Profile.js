import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch user profile
        const profileResponse = await axios.get('http://localhost:3001/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(profileResponse.data);

        // Fetch cart items
        const cartResponse = await axios.get('http://localhost:3001/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCart(cartResponse.data);
      } catch (error) {
        console.error('Error fetching profile or cart:', error);
        navigate('/login');
      }
    };

    fetchProfileAndCart();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Profile</h3>
            </div>
            <div className="card-body">
              <p><strong>Email:</strong> {user.email}</p>
              <button onClick={handleLogout} className="btn btn-primary mt-3">
                Log Out
              </button>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-header">
              <h3>Shopping Cart</h3>
            </div>
            <div className="card-body">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
