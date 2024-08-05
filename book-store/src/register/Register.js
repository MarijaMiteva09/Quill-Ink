import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to store error messages
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    try {
      const response = await axios.post('http://localhost:3001/register', {
        email,
        password
      });

      if (response.status === 201) {
        navigate('/'); // Redirect to home page on successful registration
      }
    } catch (error) {
      setError('Registration failed. Please try again.'); // Display error message
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Register</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleRegister}>
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
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
