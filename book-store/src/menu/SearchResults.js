import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookResults } = location.state || {};
  
  const handleAddToCart = async (bookId) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('You must be logged in to add books to the cart.');
      navigate('/login'); 
      return;
    }
    
    try {
      await axios.post('http://localhost:3001/cart', { bookId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Book added to cart');
    } catch (error) {
      console.error('Error adding book to cart:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Search Results</h2>
      <div className="row">
        {bookResults && bookResults.map((book) => (
          <div key={book.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{book.volumeInfo.title}</h5>
                <p className="card-text">{book.volumeInfo.authors?.join(', ')}</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(book.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
