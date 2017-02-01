import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import Components
import LoginForm from '../../components/UserLoginForm/UserLoginForm';

// Import Actions
import { loginUserRequest } from '../../UserActions';

class UserLoginPage extends Component {
  constructor(props){
    super(props);
    this.handleLoginUser = this.handleLoginUser.bind(this);
  }

  handleLoginUser = (email, password) => {
    this.props.dispatch(loginUserRequest({ email, password }));
  };

  render() {
    return (
      <div>
          <LoginForm loginUser={this.handleLoginUser} />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(dispatch) {
  return bindActionCreators({ loginUserRequest }, dispatch);
}

// Warning issued if prop not provided
UserLoginPage.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  loginUserRequest: PropTypes.func.isRequired,
};

UserLoginPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(UserLoginPage);
