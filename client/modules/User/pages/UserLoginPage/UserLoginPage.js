import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import LoginForm from '../../components/UserLoginForm/UserLoginForm';

// Import Actions
import { verifyUserRequest } from '../../UserActions';

class UserLoginPage extends Component {
  // we aren't loading any data yet.
  // componentDidMount() {
  //  this.props.dispatch([]);
  // }

  // Need to verify that user exists using form input (see UserActions)
  handleVerifyUser = (email, password) => {
    this.props.dispatch(verifyUserRequest({ email, password }));
  };

  render() {
    return (
      <div>
          <LoginForm verifyUser={this.handleVerifyUser} />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps() {
  return {};
}

// Warning issued if prop not provided
UserLoginPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  })),
  dispatch: PropTypes.func.isRequired,
};

UserLoginPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(UserLoginPage);
