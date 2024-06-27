import React from "react";
import { Link } from "react-router-dom";

const Dropdown = () => {
  const categories = [
    { id: 'fiction', name: 'Fiction' },
    { id: 'non-fiction', name: 'Non-fiction' },
    { id: 'science-fiction', name: 'Science Fiction' },
    { id: 'fantasy', name: 'Fantasy' },
    { id: 'mystery', name: 'Mystery' },
    { id: 'romance', name: 'Romance' },
    { id: 'biography', name: 'Biography' },
    { id: 'history', name: 'History' },
    { id: 'self-help', name: 'Self-help' },
    { id: 'cooking', name: 'Cooking' },
  ];

  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" 
        type="button" 
        data-bs-toggle="dropdown" 
        aria-expanded="false">
         Select Category
      </button>
      <ul className="dropdown-menu">
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`} className="dropdown-item">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;


