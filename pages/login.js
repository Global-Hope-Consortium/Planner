import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track if user is logged in
  const router = useRouter();

  // Load saved username and password from localStorage if "Remember Me" was checked
  useEffect(() => {
    const savedUsername = localStorage.getItem('rememberMeUsername');
    const savedPassword = localStorage.getItem('rememberMePassword');
    const token = localStorage.getItem('token');

    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }

    // Check if user is already logged in (i.e., has a valid token)
    if (token) {
      setIsLoggedIn(true); // User is already logged in
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending login request:', { username, password });

      const res = await axios.post('/api/auth/login', { username, password });
      console.log('Login response:', res.data);

      // Store JWT token
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful!');
      setIsLoggedIn(true); // Set the user as logged in

      // Handle "Remember Me" functionality
      if (rememberMe) {
        localStorage.setItem('rememberMeUsername', username);
        localStorage.setItem('rememberMePassword', password);
      } else {
        localStorage.removeItem('rememberMeUsername');
        localStorage.removeItem('rememberMePassword');
      }

      router.push('/plans'); // Redirect to plans page after login
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Login failed.');
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rememberMeUsername');
    localStorage.removeItem('rememberMePassword');
    setIsLoggedIn(false); // Set the user as logged out
    setMessage('Logged out successfully.');
    router.push('/login'); // Redirect to login page
  };

  return (
    <div>
      {!isLoggedIn ? (
        <>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                Show Password
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember Me
              </label>
            </div>
            <button type="submit">Login</button>
          </form>
        </>
      ) : (
        <div>
          <h1>Welcome, {username}</h1>
          <p>You are logged in!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;