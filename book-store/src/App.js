import React from 'react';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Logo from './menu/Logo';
import SearchBar from './menu/SearchBar';
import Dropdown from './menu/Dropdown';

function App() {
  return (
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
  );
}

export default App;



