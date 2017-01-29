import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

// Import Style
import styles from './UserRegistrationForm.css';

export class UserRegistrationForm extends Component {
  addUser = () => {
    const firstNameRef = this.refs.firstName;
    const lastNameRef = this.refs.lastName;
    const emailRef = this.refs.email;

    if (firstNameRef.value && lastNameRef.value && emailRef.value) {
      this.props.addUser(firstNameRef.value, lastNameRef.value, emailRef.value);
      firstNameRef.value = lastNameRef.value = emailRef.value = '';
    }
  };

  render() {
    return (
      <div className={`${styles.formContainer} ${styles.center}`}>
        <i className={`${styles.cap} fa fa-graduation-cap`} />
        <h1 className={styles.title}><FormattedMessage id="siteTitle" /></h1>

        <div className="row">
          <form method="POST" className="col-lg-4 push-lg-4 col-md-6 push-md-3 col-xs-8 push-xs-2">
            <div className="form-group row">
              <label className="input-labels">Full Name</label>
              <input type="text" className="form-control" name="nickname" placeholder="Full Name" />
            </div>
            <div className="form-group row">
              <label className="input-labels">Email</label>
              <input type="email" className="form-control" name="email" placeholder="Email" />
            </div>
            <div className="form-group row">
              <label className="input-labels">Password</label>
              <input type="password" className="form-control" name="password" placeholder="Password" />
            </div>
            <div className={styles.center}>
              <button
                className={`${styles.btnOutlineSecondary} btn btn-outline-secondary ${styles.signInButton}`}
                type="button" onClick={this.addUser}
              >
              Register and Start Studying!
              </button><br /><br />
              <Link to="/profile"><button className="btn btn-info" type="button">Temp Button to Profile Page</button></Link><br /><br />
              <Link to="/">Already have an account? Sign in Here</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

UserRegistrationForm.propTypes = {
  addUser: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(UserRegistrationForm);
