// src/components/LoginPage.js
import React, { useState } from 'react';
import Login from './Login';
import Sidebar from '../Sidebar';

const LoginPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username) => {
    // For simplicity, just set the logged-in user for demonstration purposes
    setLoggedInUser(username);
  };

  return (
    <div className="login-page">
      {loggedInUser ? (
        <Sidebar onLogin={handleLogin}/>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default LoginPage;
