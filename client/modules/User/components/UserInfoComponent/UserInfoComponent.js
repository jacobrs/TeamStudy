import React, { Component, PropTypes } from 'react';
import { injectIntl } from 'react-intl';

// Import Style
// import styles from './UserInfoComponent.css';

export class UserInfoComponent extends Component {
  render() {
    console.log("UserInfoComponent")
    console.log(this.props.users)
    return (
      <h2>{this.props.users.firstName}</h2>
    );
  }
}

// UserRegistrationForm.propTypes = {
//   // addUser: PropTypes.func.isRequired,
//   // intl: intlShape.isRequired,
// };

export default injectIntl(UserInfoComponent);
