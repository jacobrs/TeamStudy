import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Validation from 'react-validation';
import { browserHistory } from 'react-router';

import Valid from '../FormComponents/Validator';
import styles from './UserStudyGroupForm.css';
import CustomValidatorInput from '../FormComponents/CustomValidatorInput';

export class UserStudyGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { groupName: '', course: '', teacher: '', description: '' };
    this.createStudyGroup = this.createStudyGroup.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  notifyUser() {
    alert('Group successfuly created!');
  }

  removeApiError = (event) => {
    const name = event.target.name;
    this.form.hideError(name);
  };

  createStudyGroup = (e) => {
    if (this.state.groupName && this.state.course && this.state.teacher && this.state.description) {
      this.notifyUser();
      this.props.createStudyGroup(this.state.groupName, this.state.course, this.state.teacher, this.state.description);
      console.log(this.state);
      this.setState({ groupName: '', course: '', teacher: '', description: '' });
      e.preventDefault();
      browserHistory.push('/profile');
    }
  };

  render() {
    return (
        <div className={`${styles.formContainer} ${styles.center}`}>
          <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
            <div className="card card-signup">
              <div className={styles.formLabel}>
                <Validation.components.Form method="POST" ref={c => this.form = c} onSubmit={this.createStudyGroup}>
                  <h3>Register a new study group</h3>
                  <div className={styles.inputs}>
                    <CustomValidatorInput
                      onFocus={this.removeApiError}
                      className="form-control"
                      name="groupName"
                      type="text"
                      icon="group"
                      value={this.state.groupName}
                      onChange={this.updateState}
                      errorClassName="is-invalid-input"
                      placeholder={"Group Name"}
                      validations={['required']}
                    />

                    <CustomValidatorInput
                      onFocus={this.removeApiError}
                      className="form-control"
                      name="course"
                      type="text"
                      icon="label"
                      value={this.state.course}
                      onChange={this.updateState}
                      errorClassName="is-invalid-input"
                      placeholder={"Course"}
                      validations={['required']}
                    />

                    <CustomValidatorInput
                      onFocus={this.removeApiError}
                      className="form-control"
                      name="teacher"
                      type="text"
                      icon="school"
                      value={this.state.teacher}
                      onChange={this.updateState}
                      errorClassName="is-invalid-input"
                      placeholder={"Teacher"}
                      validations={['required']}
                    />

                    <CustomValidatorInput
                      onSelect={this.removeApiError}
                      className="form-control"
                      name="description"
                      type="text"
                      icon="list"
                      value={this.state.description}
                      onChange={this.updateState}
                      errorClassName="is-invalid-input"
                      placeholder={"Description"}
                      validations={['required']}
                    />
                </div>
                <Validation.components.Button className={`${styles.btnOutlineSecondary} btn btn-simple btn-primary btn-lg`}>
                  Create Study Group!
                </Validation.components.Button><br/><br/>
              </Validation.components.Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserStudyGroupForm.propTypes = {
  createStudyGroup: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(UserStudyGroupForm);
