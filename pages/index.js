// pages/index.js
import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Financial Planner</h1>
      <Link href="/login">Login</Link> | <Link href="/register">Register</Link>
    </div>
  );
};

export default Home;