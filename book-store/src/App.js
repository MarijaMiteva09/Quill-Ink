import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Logo from './menu/Logo';
import SearchBar from './menu/SearchBar';
import Dropdown from './menu/Dropdown';
import BookDetails from './menu/BookDetails';

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
                  <div className="inner-content text-center">
                    <h3 className="text-center">Yellow Background Section</h3>
                    <p className="text-center">This is a new section with a yellow background.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        } />
        <Route path="/category/:categoryId" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




