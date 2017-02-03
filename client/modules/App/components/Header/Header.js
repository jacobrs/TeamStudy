import React from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

export function Header() {
  return (
    <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
      <i className={`${styles.cap} fa fa-graduation-cap`} />
      <Link className="navbar-brand" to="/profile">Profile</Link>
      <Link className="navbar-brand">Documents</Link>
      <Link className="navbar-brand">Groups</Link>
      <Link className="navbar-brand" to="/">Log Out</Link>
    </nav>
  );
}

export default Header;
