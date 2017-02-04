import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';

export function Header(props, context) {
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

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default Header;
