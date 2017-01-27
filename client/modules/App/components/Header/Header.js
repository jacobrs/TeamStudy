import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';

export function Header(props, context) {
  const cls = `${styles.form} ${(this.props.showHeader ? styles.appear : styles.hidden)}`;
  return (
    <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
      <a className="navbar-brand" href="#">Studee</a>
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
