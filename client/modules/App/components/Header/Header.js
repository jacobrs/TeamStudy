import React from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

export function Header() {
  return (
    <nav className="navbar navbar-toggleable-md navbar-light bg-faded" id={styles.navbar}>
      <div className="navbar-header">
        <div className="navbar-brand pull-left" id={styles.brand}><span><i className={`${styles.cap} fa fa-graduation-cap`} aria-hidden="true"></i>TeamStudy</span></div>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false" aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className={`nav navbar-nav ${styles.right}`}>
          <li className="nav-item active">
            <i className={`${styles['small-nav-icon']} fa fa-home`} aria-hidden="true"></i>
            <Link className={`nav-link ${styles['nav-links-inline']}`}>Home</Link>
          </li>
          <li className="nav-item">
            <i className={`${styles['small-nav-icon']} fa fa-calendar`} aria-hidden="true"></i>
            <Link className={`nav-link ${styles['nav-links-inline']}`}>Calendar</Link>
          </li>
          <li className="nav-item">
            <i className={`${styles['small-nav-icon']} fa fa-file-text`} aria-hidden="true"></i>
            <Link className={`nav-link ${styles['nav-links-inline']}`}>Documents</Link>
          </li>
          <li className="nav-item" id={styles.signout}>
            <Link className={`nav-link ${styles['nav-links-inline']}`}>Sign Out</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
