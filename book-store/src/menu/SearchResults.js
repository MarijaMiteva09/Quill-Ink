import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const { query, bookResults } = location.state || { query: '', bookResults: [] };

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      <div className="row">
        {bookResults.map((book) => {
          const { id, volumeInfo } = book;
          const { title, authors, description, imageLinks } = volumeInfo;

          return (
            <div key={id} className="col-md-4 mb-4">
              <div className="card h-100">
                {imageLinks?.thumbnail && (
                  <img src={imageLinks.thumbnail} alt={title} className="card-img-top" />
                )}
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  {authors && <p className="card-text">By: {authors.join(', ')}</p>}
                  {description && <p className="card-text">{description}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;

