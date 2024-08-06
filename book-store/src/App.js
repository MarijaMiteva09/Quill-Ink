import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Logo from './menu/Logo';
import SearchBar from './menu/SearchBar';
import Dropdown from './menu/Dropdown';
import BookDetails from './menu/BookDetails';
import SearchResults from './menu/SearchResults';
import FeaturedBooks from '../src/featuredbooks/FeaturedBooks';
import Register from './register/Register';
import LogIn from './register/LogIn';
import Profile from './register/Profile';
import Cart from './menu/Cart'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="container-fluid p-0">
            <div className="row justify-content-center align-items-center text-center">
              <div className="col-12 d-flex justify-content-center align-items-center position-relative">
                <div className="top-right-buttons">
                  <Link to="/login">
                    <button className="btn btn-primary mx-2">Log In</button>
                  </Link>
                  <Link to="/register">
                    <button className="btn btn-secondary mx-2">Register</button>
                  </Link>
                  <Link to="/profile">
                    <button className="btn btn-info mx-2">Profile</button>
                  </Link>
                </div>
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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/category/:categoryId" element={<BookDetails />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
