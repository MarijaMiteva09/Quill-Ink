import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const key = 'AIzaSyC7f0E-kEWx7ne46qeCjQJIjsZebISz_CQ';

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query === '') return;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${key}`
      );
      const bookResults = response.data.items || [];
      setBooks(bookResults);

      navigate('/results', { state: { query, bookResults } });
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="input-group search-bar">
          <input
            type="text"
            className="form-control border-0"
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="search-icon"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit" id="search-icon">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
