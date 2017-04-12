import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import Validation from 'react-validation';

import Valid from '../FormComponents/Validator';
import styles from '../UserStudyGroupForm/UserStudyGroupForm.css';
import CustomValidatorInput from '../FormComponents/CustomValidatorInput';

export class UserUpdateForm extends Component {
  constructor(props) {
    super(props);
    if (props.user == undefined) {
      this.state = { nickname: '', studentId: '', email: '', password: '', passwordConfirm: '' };
    } else {
      this.state = {
        nickname: props.user.firstName + ' ' + props.user.lastName,
        studentId: props.user.studentId,
        email: props.user.email,
        password: '',
        passwordConfirm: '',
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
      // To stop the page from refreshing
      e.preventDefault();
    }
  };

  render() {
    return (
      <div className={`${styles.formContainer} ${styles.center}`}>
        <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
          <div className="card card-signup">
            <div className={styles.formLabel}>
              <Validation.components.Form ref={c => { this.form = c; }} onSubmit={this.updateUser}>
                  <h3>Edit Information</h3>
                  <div className={styles.inputs}>
                    <CustomValidatorInput
                      onFocus={this.removeApiError}
                      className="form-control"
                      name="nickname"
                      type="text"
                      icon="person"
                      value={this.state.nickname}
                      onChange={this.updateState}
                      errorClassName="is-invalid-input"
                      placeholder={"Full Name"}
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
                      errorClassName="is-invalid-input"
                      placeholder={"Student ID"}
                      validations={['required', 'studentId']}
                    />

                    <CustomValidatorInput
                      onFocus={this.removeApiError}
                      className="form-control"
                      name="email"
                      type="text"
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
                      placeholder={"Password"}
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
                      placeholder={"Confirm password"}
                      validations={['required', 'passwordMatch']}
                    />
                  </div>
                  <Validation.components.Button className={`${styles.btnOutlineSecondary} btn btn-simple btn-primary btn-lg ${styles.signInButton}`}>
                    Update Information
                  </Validation.components.Button><br/><br/>
              </Validation.components.Form>
            </div>
          </div>
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
