import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

// Import Style
import styles from './UserLoginForm.css';

export class UserLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  showError(divId) {
    var elem = document.getElementById(divId);
    elem.style.color = 'Red';
    $('#' + divId).show();
  }

  loginUser = () => {
    if (this.state.email && this.state.password) {
      this.props.loginUser(this.state.email, this.state.password);
      this.setState({ email: '', password: '' });
    }
    if (this.props.logged.user) {
      this.showError('errorMessage');
    }
  };

  // Display form
  render() {
    return (
      <div className={styles.formContainer + ' ' + styles.center}>
        <i className={styles.cap + ' fa fa-graduation-cap'} />
        <h1 className={styles.title}><FormattedMessage id="siteTitle" /></h1>

        <div className="row">
          <form id="login" method="POST" className="col-lg-4 push-lg-4 col-md-6 push-md-3 col-xs-8 push-xs-2">
            <div className="form-group row">
              <label className="input-labels">Email</label>
              <input type="email" className="form-control" name="email" placeholder="Email" value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group row">
              <label className="input-labels">Password</label>
              <input type="password" className="form-control" name="password" placeholder="Password"
                value={this.state.password} onChange={this.handleInputChange}
              />
            </div>

            <div id="errorMessage" className="collapse">The account or password provided is invalid</div>
            <br />

            <div className={styles.center}>
              <button className={styles.btnOutlineSecondary + ' btn btn-outline-secondary ' + styles.logInButton}
                type="button" onClick={this.loginUser}
              >
                Log In!</button><br /><br />
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
  loginUser: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(UserLoginForm);
