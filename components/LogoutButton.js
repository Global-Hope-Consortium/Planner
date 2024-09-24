// components/LogoutButton.js
import { useRouter } from 'next/router';
import React from 'react';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token and any remembered credentials
    localStorage.removeItem('token');
    localStorage.removeItem('rememberMeUsername');
    localStorage.removeItem('rememberMePassword');

    // Redirect to login page
    router.push('/login');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;