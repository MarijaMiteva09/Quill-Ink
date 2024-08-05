import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to store error messages
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleLogIn = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password
      });

      if (response.status === 200) {
        // Store the token if needed (e.g., in local storage)
        localStorage.setItem('token', response.data.token);
        navigate('/'); // Redirect to profile page on successful login
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.'); // Display error message
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Log In</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogIn}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-danger">{error}</p>} {/* Display error message */}
                <button type="submit" className="btn btn-primary btn-block mt-3">
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
