import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
  // State variables for form data, showing the password, and remember me feature
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  // Check if user is already logged in by looking for a JWT token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // If a token is found, assume the user is logged in and redirect to the /plans page
      router.push('/plans');
    }
  }, [router]); // The router dependency ensures redirection occurs when the router is available

  // Load saved username and password from localStorage if the "Remember Me" option was previously selected
  useEffect(() => {
    const savedUsername = localStorage.getItem('rememberMeUsername');
    const savedPassword = localStorage.getItem('rememberMePassword');
    
    // If the username and password were saved, update the state to fill the form
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true); // Set "Remember Me" checkbox to checked
    }
  }, []);

  // Handle form submission (login)
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page on submit

    try {
      console.log('Sending login request:', { username, password });

      // Send login request to the server
      const res = await axios.post('/api/auth/login', { username, password });
      console.log('Login response:', res.data);

      // Store the received JWT token in localStorage
      localStorage.setItem('token', res.data.token);
      setMessage(`Welcome back, ${username}!`);

      // Handle the "Remember Me" functionality
      if (rememberMe) {
        // If "Remember Me" is checked, save the username and password in localStorage
        localStorage.setItem('rememberMeUsername', username);
        localStorage.setItem('rememberMePassword', password);
      } else {
        // Otherwise, remove the saved credentials
        localStorage.removeItem('rememberMeUsername');
        localStorage.removeItem('rememberMePassword');
      }

      // Redirect to the /plans page after a successful login
      router.push('/plans');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div>
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;