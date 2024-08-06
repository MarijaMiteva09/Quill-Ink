import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { categoryId } = useParams();
  const [books, setBooks] = useState([]);
  const key = 'AIzaSyC7f0E-kEWx7ne46qeCjQJIjsZebISz_CQ';

  useEffect(() => {
    fetchBooks(categoryId);
  }, [categoryId]);

  const fetchBooks = async (categoryId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${categoryId}&key=${key}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addToCart = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to add items to the cart.');
        return;
      }

      await axios.post('http://localhost:3001/cart', { bookId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Book added to cart!');
    } catch (error) {
      console.error('Error adding book to cart:', error);
      alert('Failed to add book to cart.');
    }
  };

  return (
    <div className="book-details">
      <h2>Books in Category: {categoryId}</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt="Book Cover"
            />
            <div className="book-info">
              <h3>{book.volumeInfo.title}</h3>
              <p><strong>Authors:</strong> {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
              <p><strong>Published Date:</strong> {book.volumeInfo.publishedDate}</p>
              <p><strong>Page Count:</strong> {book.volumeInfo.pageCount}</p>
              <p><strong>Categories:</strong> {book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Unknown Category'}</p>
              <p><strong>Description:</strong> {book.volumeInfo.description}</p>
              <button onClick={() => addToCart(book.id)} className="btn btn-primary">
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookDetails;
