import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

// Import Style
import styles from './UserLoginForm.css';

export class UserLoginForm extends Component {
  verifyUser = () => {
    const emailRef = this.refs.email;
    const passwordRef = this.refs.password;

    // Verify if given input for all fields
    if (emailRef.value && passwordRef.value) {
      this.props.verifyUser(emailRef.value, passwordRef.value);   // verifyUser given values.
      emailRef.value = passwordRef.value = '';  // Reset values
    }
  };

  // Display form
  render() {
    return (
      <div className={styles.formContainer + " " + styles.center}>
        <i className={styles.cap + " fa fa-graduation-cap"}/>
        <h1 className={styles.title}><FormattedMessage id="siteTitle"/></h1>

        <div className="row">
          <form method="POST" className="col-lg-4 push-lg-4 col-md-6 push-md-3 col-xs-8 push-xs-2">
            <div className="form-group row">
              <label className="input-labels">Email</label>
              <input type="email" className="form-control" name="email" placeholder="Email"/>
            </div>
            <div className="form-group row">
              <label className="input-labels">Password</label>
              <input type="password" className="form-control" name="password" placeholder="Password"/>
            </div>
            <div className={styles.center}>
              <button className={styles.btnOutlineSecondary + " btn btn-outline-secondary " + styles.logInButton}
                      type="button" onClick={this.verifyUser}>
                Log In!</button><br/><br/>
              <Link to="/register">Don't have an account yet? Register Here</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// Warning issued if prop not provided
UserLoginForm.propTypes = {
  verifyUser: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(UserLoginForm);
