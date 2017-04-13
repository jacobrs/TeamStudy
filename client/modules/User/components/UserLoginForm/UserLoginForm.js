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
    this.onHandleEnter = this.onHandleEnter.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    document.body.style.backgroundImage = "url('http://" + location.host + "/static/material-ui/img/bg-landing.jpeg')";
  }

  componentDidUpdate(prevProps, prevState) {
    $.material.init();
  }

  showError(divId) {
    var elem = document.getElementById(divId);
    elem.style.color = 'Red';
    $('#' + divId).show();
  }

  onHandleEnter(event) {
    if (event.keyCode === 13) {
      this.loginUser();
    }
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
      <div className={"row " + styles.formContainer} onKeyDown={this.onHandleEnter}>
        <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
          <div className="card card-signup">
            <form className="login" method="POST">
              <div className="header header-info text-center">
                <div className={styles.title}><i className={styles.cap + ' fa fa-graduation-cap'} />&nbsp;&nbsp;<FormattedMessage id="siteTitle" /></div>
              </div>
              <p className={"text-divider " + styles.textDivider}>Sign into the system</p><br/><br/>
              <div className="content">

                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="material-icons">email</i>
                  </span>
                  <input type="email" className="form-control" name="email" placeholder="Email..." value={this.state.email}
                        onChange={this.handleInputChange} autoComplete="off"/>
                </div>

                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="material-icons">lock_outline</i>
                  </span>
                  <input type="password" className="form-control" name="password" placeholder="Password..."
                        value={this.state.password} onChange={this.handleInputChange} autoComplete="off"
                      />
                </div>
              </div>
              <div className="footer text-center">
                <div id="errorMessage" className="collapse">The account or password provided is invalid</div><br/>
                <a className="btn btn-simple btn-primary btn-lg" onClick={this.loginUser}>Sign in</a>
                <p className={styles.textDivider + " " + styles.noTopDivider + " text-divider"}>Don&apos;t have an account?</p>
                <Link to="/register" className="btn btn-simple btn-primary btn-lg">Create an account</Link><br/><br/>
              </div>
            </form>
          </div>
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
