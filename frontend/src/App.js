import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import UserDetails from './components/UserDetails';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: '4em' }}>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/user" element={token ? <UserDetails token={token} /> : <p>Please log in</p>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
