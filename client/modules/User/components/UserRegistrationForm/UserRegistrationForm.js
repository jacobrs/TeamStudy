import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import Validation from 'react-validation';

import Valid from '../FormComponents/Validator';
import styles from './UserRegistrationForm.css';

export class UserRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {nickname: '', studentId: '', email: '', password: ''}
    this.addUser = this.addUser.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  removeApiError = (event) => {
    const name = event.target.name;
    this.form.hideError(name);
  };

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
          <Validation.components.Form method="POST" ref={c => { this.form = c; }} onSubmit={this.addUser} className="col-lg-4 push-lg-4 col-md-6 push-md-3 col-xs-8 push-xs-2">

              <div className="form-group row">
                <label className="input-labels">Full Name</label>
                <Validation.components.Input
                  onFocus={this.removeApiError}
                  className="form-control"
                  name="nickname"
                  type="text"
                  value={this.state.nickname}
                  errorClassName="is-invalid-input"
                  placeholder={"Enter your full name here"}
                  validations={['required', 'validName']}
                />
              </div>

             <div className="form-group row">
              <label className="input-labels">Student ID</label>
              <Validation.components.Input
                onFocus={this.removeApiError}
                className="form-control"
                name="studentId"
                type="text"
                value={this.state.studentId}
                onChange={this.updateState}
                errorClassName="is-invalid-input"
                placeholder={"Enter your studentId here"}
                validations={['required', 'studentId']}
              />
            </div>

            <div className="form-group row">
              <label className="input-labels">Email</label>
              <Validation.components.Input
                onFocus={this.removeApiError}
                className="form-control"
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.updateState}
                errorClassName="is-invalid-input"
                placeholder={"Enter your email here"}
                validations={['required', 'email']}
              />
            </div>

            <div className="form-group row">
              <label className="input-labels">password</label>
              <Validation.components.Input
                onFocus={this.removeApiError}
                className="form-control"
                name="password"
                type="text"
                value={this.state.password}
                onChange={this.updateState}
                errorClassName="is-invalid-input"
                placeholder={"Enter your password here"}
                validations={['required']}
              />
            </div>

            <div className={styles.center}>
               <Validation.components.Button className={`${styles.btnOutlineSecondary} btn btn-outline-secondary  ${styles.signInButton}`}>
               Register and Start Studying!
               </Validation.components.Button><br /><br />
                    <Link to="/profile"><button className="btn btn-info" type="button">Temp Button to Profile Page</button></Link><br /><br />
                    <Link to="/">Already have an account? Sign in Here</Link>
                  </div>
              </Validation.components.Form>
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
