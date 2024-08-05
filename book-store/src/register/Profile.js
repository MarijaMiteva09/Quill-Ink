import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile information
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect to login if token is not present
          return;
        }

        const response = await axios.get('http://localhost:3001/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login'); // Redirect to login on error
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/'); // Redirect to home page
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Profile</h3>
            </div>
            <div className="card-body">
              <p><strong>Email:</strong> {user.email}</p>
              <button onClick={handleLogout} className="btn btn-primary mt-3">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
