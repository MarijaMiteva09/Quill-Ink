import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Logo from './menu/Logo';
import SearchBar from './menu/SearchBar';
import Dropdown from './menu/Dropdown';
import BookDetails from './menu/BookDetails';
import SearchResults from './menu/SearchResults';
import FeaturedBooks from '../src/featuredbooks/FeaturedBooks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="container-fluid p-0">
            <div className="row justify-content-center align-items-center text-center">
              <div className="col-12 d-flex justify-content-center align-items-center">
                <div className="mx-3"><Logo /></div>
                <div className="mx-3"><SearchBar /></div>
                <div className="mx-3"><Dropdown /></div>
              </div>
            </div>
            <div className="row mt-3 justify-content-center">
              <div className="col-md-12 p-0">
                <div className="yellow-background d-flex align-items-center justify-content-center">
                  <FeaturedBooks />
                </div>
              </div>
            </div>
          </div>
        } />
        <Route path="/category/:categoryId" element={<BookDetails />} />
        <Route path="/results" element={<SearchResults />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;





