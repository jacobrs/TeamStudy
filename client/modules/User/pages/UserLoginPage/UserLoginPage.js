import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import callApi from '../../../../util/apiCaller';

// Import Components
import LoginForm from '../../components/UserLoginForm/UserLoginForm';

// Import Actions
import { loginUser } from '../../UserActions';

class UserLoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleLoginUser = this.handleLoginUser.bind(this);
  }

  handleLoginUser = (email, password) => {
    callApi('users/login', 'post', {
      password,
      email,
    }).then(res => this.props.loginUser(res));
  };

  render() {
    return (
      <div>
        <LoginForm loginUser={this.handleLoginUser} />
      </div>
    );
  }
}

// Bind actions to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser }, dispatch);
}

// Warning issued if prop not provided
UserLoginPage.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  loginUser: PropTypes.func.isRequired,
};

UserLoginPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(null, mapDispatchToProps)(UserLoginPage);
