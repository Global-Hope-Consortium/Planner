import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending login request:', { username, password });

      const res = await axios.post('/api/auth/login', { username, password });
      console.log('Login response:', res.data); 

      localStorage.setItem('token', res.data.token); // Store JWT token
      setMessage('Login successful!');
      router.push('/plans'); // Redirect to plans page
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
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;