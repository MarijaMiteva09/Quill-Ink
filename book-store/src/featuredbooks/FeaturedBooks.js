// menu/FeaturedBooks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeaturedBooks.css';

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=bestsellers&maxResults=6&key=AIzaSyC7f0E-kEWx7ne46qeCjQJIjsZebISz_CQ`
        );
        setBooks(response.data.items || []);
      } catch (error) {
        console.error('Error fetching featured books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="row featured-books">
      {books.map((book) => {
        const { id, volumeInfo, saleInfo } = book;
        const { title, authors, categories, imageLinks } = volumeInfo;
        const { retailPrice } = saleInfo;

        return (
          <div key={id} className="col-sm-6 col-md-4 col-lg-2 mb-4">
            <div className="card h-100">
              {imageLinks?.thumbnail && (
                <img src={imageLinks.thumbnail} alt={title} className="card-img-top" />
              )}
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                {authors && <p className="card-text">By: {authors.join(', ')}</p>}
                {categories && <p className="card-text">Category: {categories.join(', ')}</p>}
                {retailPrice && <p className="card-text">Price: ${retailPrice.amount}</p>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedBooks;
