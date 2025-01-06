import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(''); // State for error message

  // Retrieve the registered user's credentials from localStorage
  const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

  // Handle form data change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  // Handle form submission and validate credentials
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the email and password against the registered user in localStorage
    if (registeredUser && formData.email === registeredUser.email && formData.password === registeredUser.password) {
      console.log('Logged in successfully:', formData);
      setError(''); // Clear error message
      localStorage.setItem('user', JSON.stringify(registeredUser)); // Store user data in localStorage
      navigate('/'); // Redirect to the home page after successful login
    } else {
      setError('Invalid email or password! Please try again.'); // Set error message
    }
  };

  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="my-3">
                <p>
                  New Here?{' '}
                  <Link to="/register" className="text-decoration-underline text-info">
                    Register
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
