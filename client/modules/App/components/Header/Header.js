import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logoutReq();
  }

  render() {
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
              <Link className={`nav-link ${styles['nav-links-inline']}`} to="/registerGroup">Create Study Group</Link>
            </li>
            <li className="nav-item active">
              <i className={`${styles['small-nav-icon']} fa fa-home`} aria-hidden="true"></i>
              <Link className={`nav-link ${styles['nav-links-inline']}`} to="/profile">Home</Link>
            </li>
            <li className="nav-item" id={styles.signout}>
              <Link onClick={this.handleLogout} className={`nav-link ${styles['nav-links-inline']}`}>Sign Out</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }


}

Header.propTypes = {
  logoutReq: PropTypes.func.isRequired,
};

export default Header;
