import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode the JWT to get the username
        const decoded = jwt.decode(token);
        if (decoded && decoded.username) {
          setUsername(decoded.username);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token'); // Remove invalid token
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false); // Reset login state
    router.push('/login'); // Redirect to login page
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome back, {username}!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Welcome to Financial Planner</h1>
          <Link href="/login">Login</Link> | <Link href="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Home;