import React from 'react';

const SearchBar = () => {
  return (
    <div className="input-group search-bar">
      <input type="text" className="form-control border-0" placeholder="Search..." aria-label="Search" aria-describedby="search-icon" />
      <div className="input-group-append">
        <span className="input-group-text border-0 bg-transparent" id="search-icon">
          <i className="bi bi-search"></i>
        </span>
      </div>
    </div>
  );
}

export default SearchBar;

