import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

// Import Style
import styles from './UserRegistrationForm.css';

export class UserRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { nickname: '', studentId: '', email: '', password: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  addUser = () => {
    console.log(this.state);
    if (this.state.nickname && this.state.studentId && this.state.email && this.state.password) {
      this.props.addUser(this.state.nickname, this.state.studentId, this.state.email, this.state.password);
      this.setState({ nickname: '', studentId: '', email: '', password: '' });
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
              <input value={this.state.nickname} type="text" className="form-control" name="nickname" placeholder="Full Name" onChange={this.handleInputChange} />
            </div>
            <div className="form-group row">
              <label className="input-labels">Student ID</label>
              <input value={this.state.studentId} type="text" className="form-control" name="studentId" placeholder="Student ID" onChange={this.handleInputChange} />
            </div>
            <div className="form-group row">
              <label className="input-labels">Email</label>
              <input value={this.state.email} type="email" className="form-control" name="email" placeholder="Email" onChange={this.handleInputChange} />
            </div>
            <div className="form-group row">
              <label className="input-labels">Password</label>
              <input value={this.state.password} type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleInputChange} />
            </div>
            <div className={styles.center}>
              <button
                className={`${styles.btnOutlineSecondary} btn btn-outline-secondary ${styles.signInButton}`}
                type="button" onClick={this.addUser}
              >
              Register and Start Studying!
              </button><br /><br />
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
