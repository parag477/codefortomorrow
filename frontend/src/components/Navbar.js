import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.link}>Signup</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/login" style={styles.link}>Login</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/user" style={styles.link}>User Details</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/forgot-password" style={styles.link}>Forgot Password</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '0.5em',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 0.5em',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1em',
  },
};

export default Navbar;
