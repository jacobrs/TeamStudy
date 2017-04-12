import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link, browserHistory } from 'react-router';
import Validation from 'react-validation';

import Valid from '../FormComponents/Validator';
import CustomValidatorInput from '../FormComponents/CustomValidatorInput';
import styles from './UserRegistrationForm.css';

export class UserRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { nickname: '', studentId: '', email: '', password: '', passwordConfirm: '' };
    this.addUser = this.addUser.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    document.body.style.backgroundImage = "url('http://" + location.host + "/static/material-ui/img/bg-landing.jpeg')";
    if(window.jQuery){
      $.material.init();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    $.material.init();
  }

  notifyUser() {
    alert('Account successfuly created!');
  }

  removeApiError = (event) => {
    const name = event.target.name;
    this.form.hideError(name);
  };

  addUser = (e) => {
    if (this.state.nickname && this.state.studentId && this.state.email && this.state.password) {
      this.notifyUser();
      this.props.addUser(this.state.nickname, this.state.studentId, this.state.email, this.state.password);
      this.setState({ nickname: '', studentId: '', email: '', password: '', passwordConfirm: '' });
      //To stop the page from refreshing
      e.preventDefault();
      browserHistory.push('/');
    }
  };

  render() {
    return (
      <div className={"row " + styles.formContainer}>
        <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
          <div className="card card-signup">
            <Validation.components.Form method="POST" ref={c => { this.form = c; }} onSubmit={this.addUser}>
              <div className="header header-info text-center">
                <div className={styles.title}><i className={styles.cap + ' fa fa-graduation-cap'} />&nbsp;&nbsp;<FormattedMessage id="siteTitle" /></div>
              </div>
              <p className={"text-divider " + styles.textDivider}>Create a new account</p><br/><br/>

              <div className={"content " + styles.center}>

                  <CustomValidatorInput
                      onFocus={this.removeApiError}
                      className="form-control"
                      name="nickname"
                      type="text"
                      icon="face"
                      value={this.state.nickname}
                      onChange={this.updateState}
                      errorClassName="has-error"
                      placeholder={"Full Name..."}
                      validations={['required', 'validName']}
                    />

                  <CustomValidatorInput
                      onFocus={this.removeApiError}
                      className="form-control"
                      name="studentId"
                      type="text"
                      icon="recent_actors"
                      value={this.state.studentId}
                      onChange={this.updateState}
                      errorClassName="has-error"
                      placeholder={"Student ID..."}
                      validations={['required', 'studentId']}
                    />

                  <CustomValidatorInput
                      onFocus={this.removeApiError}
                      className="form-control"
                      name="email"
                      type="email"
                      icon="email"
                      value={this.state.email}
                      onChange={this.updateState}
                      errorClassName="is-invalid-input"
                      placeholder={"Email"}
                      validations={['required', 'email']}
                    />

                  <CustomValidatorInput
                      onFocus={this.removeApiError}
                      className="form-control"
                      name="password"
                      type="password"
                      icon="lock"
                      value={this.state.password}
                      onChange={this.updateState}
                      errorClassName="is-invalid-input"
                      placeholder={"Password..."}
                      validations={['required', 'password']}
                    />   

                  <CustomValidatorInput
                      onSelect={this.removeApiError}
                      className="form-control"
                      name="passwordConfirm"
                      type="password"
                      icon="lock_outline"
                      value={this.state.passwordConfirm}
                      onChange={this.updateState}
                      errorClassName="is-invalid-input"
                      placeholder={"Confirm password..."}
                      validations={['required', 'passwordMatch']}
                    />               

                   <Validation.components.Button className='btn btn-simple btn-primary btn-lg'>
                      Register and join your peers
                   </Validation.components.Button>
                   <p className={styles.textDivider + " " + styles.noTopDivider + " text-divider"}>Already have an account?</p>
                <Link className={styles.mainText + " btn btn-simple btn-primary btn-lg"} to="/">Sign in Here</Link>
              </div>
            </Validation.components.Form>
          </div>
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
