import React from 'react';
import './App.css'; // Import your custom styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import logo from './logo.png';

function App() {
  return (
    <div className="container-fluid p-0">
      <div className="row justify-content-center align-items-center text-center">
        <div className="col-md-4">
          <img src={logo} alt="Logo" className="smaller-logo" />
        </div>

        <div className="col-md-4">
          <div className="input-group">
            <input type="text" className="form-control border-0" placeholder="Search..." aria-label="Search" aria-describedby="search-icon" />
            <div className="input-group-append">
              <span className="input-group-text border-0 bg-transparent" id="search-icon">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown button
          </button>
           <ul class="dropdown-menu">
             <li><a class="dropdown-item" href="#">Action</a></li>
             <li><a class="dropdown-item" href="#">Another action</a></li>
             <li><a class="dropdown-item" href="#">Something else here</a></li>
           </ul>
          </div>
        </div>
      </div>

      <div className="row mt-3 justify-content-center">
        <div className="col-md-12">
          <div className="yellow-background d-flex align-items-center justify-content-center">
            <div className="inner-content text-center"></div>
            <h3 className="text-center">Yellow Background Section</h3>
            <p className="text-center">This is a new section with a yellow background.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
