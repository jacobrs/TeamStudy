import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Validation from 'react-validation';

import Valid from '../FormComponents/Validator';
import styles from './UserStudyGroupForm.css';

export class UserStudyGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { groupName: '', course: '', teacher: '', description: ''};
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
      this.props.addUserStudyGroups(this.props.users.user, this.state.groupName, this.state.course, this.state.teacher, this.state.description);
      console.log(this.state);
      this.setState({ groupName: '', course: '', teacher: '', description: '' });
      e.preventDefault();
    }
  };

  render() {
    return (
        <div className={`${styles.formContainer} ${styles.center}`}>
            <i className={`${styles.cap} fa fa-graduation-cap`} />
            <h1 className={styles.title}><FormattedMessage id="siteTitle" /></h1>

          <div className={styles.formLabel + ' row'}>
          <Validation.components.Form method="POST" ref={c => this.form = c} onSubmit={this.createStudyGroup} className="col-lg-4 push-lg-4 col-md-6 push-md-3 col-xs-8 push-xs-2">

                <label className="input-labels"> Group Name* </label>
                <Validation.components.Input
                  onFocus={this.removeApiError}
                  className="form-control"
                  name="groupName"
                  type="text"
                  value={this.state.groupName}
                  onChange={this.updateState}
                  errorClassName="is-invalid-input"
                  placeholder={"Group Name"}
                  validations={['required']}
                /><br />

              <label className="input-labels"> Course* </label>
                <Validation.components.Input
                  onFocus={this.removeApiError}
                  className="form-control"
                  name="course"
                  type="text"
                  value={this.state.course}
                  onChange={this.updateState}
                  errorClassName="is-invalid-input"
                  placeholder={"Course"}
                  validations={['required']}
                /><br />

              <label className="input-labels"> Teacher* </label>
                <Validation.components.Input
                  onFocus={this.removeApiError}
                  className="form-control"
                  name="teacher"
                  type="text"
                  value={this.state.teacher}
                  onChange={this.updateState}
                  errorClassName="is-invalid-input"
                  placeholder={"Teacher"}
                  validations={['required']}
                /><br />

              <label className="input-labels"> Description* </label>
                <Validation.components.Textarea
                  onSelect={this.removeApiError}
                  className="form-control"
                  name="description"
                  type="text"
                  value={this.state.description}
                  onChange={this.updateState}
                  errorClassName="is-invalid-input"
                  placeholder={"Description"}
                  validations={['required']}
                /><br />

               <Validation.components.Button className={`${styles.btnOutlineSecondary} btn btn-outline-secondary`}>
               Create Study Group!
               </Validation.components.Button><br /><br />
              </Validation.components.Form>
          </div>
      </div>
    );
  }
}

UserStudyGroupForm.propTypes = {
  createStudyGroup: PropTypes.func.isRequired,
  addUserStudyGroups: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(UserStudyGroupForm);
