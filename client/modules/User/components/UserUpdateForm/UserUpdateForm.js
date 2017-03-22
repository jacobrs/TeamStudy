import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import Validation from 'react-validation';

import Valid from '../FormComponents/Validator';
import styles from '../UserRegistrationForm/UserRegistrationForm.css';

export class UserUpdateForm extends Component {
  constructor(props) {
    super(props);
    if(props.user == undefined){
      this.state = { nickname: '', studentId: '', email: '', password: '', passwordConfirm: '' };
    }else{
      this.state = { 
        nickname: props.user.firstName + " " + props.user.lastName,
        studentId: props.user.studentId,
        email: props.user.email,
        password: "",
        passwordConfirm: ""
      };
    }
    this.user = props.user;
    this.updateUser = this.updateUser.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  notifyUser() {
    alert('Account information succesfully updated!');
  }

  removeApiError = (event) => {
    const name = event.target.name;
    this.form.hideError(name);
  };

  updateUser = (e) => {
    if (this.state.nickname && this.state.studentId && this.state.email && this.state.password) {
      const fullname = this.state.nickname.split(' ');
      const firstName = fullname.shift();
      const lastName = fullname.shift() || '';
      this.props.updateUser(firstName, lastName, this.state.studentId, this.state.email, this.state.password, this.user.cuid);
      this.notifyUser();
      this.setState({ nickname: '', studentId: '', email: '', password: '', passwordConfirm: '' });
      //To stop the page from refreshing
      e.preventDefault();
    }
  };

  render() {
    return (
        <div className={`${styles.formContainer} ${styles.center}`}>
          <div className={styles.formLabel + ' row'}>
          <Validation.components.Form ref={c => { this.form = c; }} onSubmit={this.updateUser} className="col-lg-4 push-lg-4 col-md-6 push-md-3 col-xs-8 push-xs-2">

                <label className="input-labels"> Full Name* </label>
                <Validation.components.Input
                  onFocus={this.removeApiError}
                  className="form-control"
                  name="nickname"
                  type="text"
                  value={this.state.nickname}
                  onChange={this.updateState}
                  errorClassName="is-invalid-input"
                  placeholder={"Full Name"}
                  validations={['required', 'validName']}
                /><br />

              <label className="input-labels"> Student ID* </label>
                <Validation.components.Input
                  onFocus={this.removeApiError}
                  className="form-control"
                  name="studentId"
                  type="text"
                  value={this.state.studentId}
                  onChange={this.updateState}
                  errorClassName="is-invalid-input"
                  placeholder={"Student ID"}
                  validations={['required', 'studentId']}
                /><br />

              <label className="input-labels"> Email*</label>
                <Validation.components.Input
                  onFocus={this.removeApiError}
                  className="form-control"
                  name="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.updateState}
                  errorClassName="is-invalid-input"
                  placeholder={"Email"}
                  validations={['required', 'email']}
                /><br />

              <label className="input-labels"> Password* </label>
                <Validation.components.Input
                  onFocus={this.removeApiError}
                  className="form-control"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.updateState}
                  errorClassName="is-invalid-input"
                  placeholder={"Password"}
                  validations={['required', 'password']}
                /><br />

              <label className="input-labels"> Confirm Password*</label>
                <Validation.components.Input
                  onSelect={this.removeApiError}
                  className="form-control"
                  name="passwordConfirm"
                  type="password"
                  value={this.state.passwordConfirm}
                  onChange={this.updateState}
                  errorClassName="is-invalid-input"
                  placeholder={"Confirm password"}
                  validations={['required', 'passwordMatch']}
                /><br />

               <Validation.components.Button className={`${styles.btnOutlineSecondary} btn btn-outline-secondary  ${styles.signInButton}`}>
               Update Information
               </Validation.components.Button><br /><br />
                    <Link className={styles.mainText} to="/profile">Return to main menu</Link>

              </Validation.components.Form>
          </div>
      </div>
    );
  }
}

UserUpdateForm.propTypes = {
  user: PropTypes.object,
  updateUser: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(UserUpdateForm);