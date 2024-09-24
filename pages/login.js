import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  // Load saved username and password from localStorage if "Remember Me" was checked
  useEffect(() => {
    const savedUsername = localStorage.getItem('rememberMeUsername');
    const savedPassword = localStorage.getItem('rememberMePassword');

    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
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
      setMessage(`Welcome back, ${username}!`);

      // Handle "Remember Me" functionality
      if (rememberMe) {
        localStorage.setItem('rememberMeUsername', username);
        localStorage.setItem('rememberMePassword', password);
      } else {
        localStorage.removeItem('rememberMeUsername');
        localStorage.removeItem('rememberMePassword');
      }

      // Redirect to the plans page after successful login
      router.push('/plans'); // Redirect here after setting token
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