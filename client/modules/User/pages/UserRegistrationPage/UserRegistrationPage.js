import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import RegistrationForm from '../../components/UserRegistrationForm/UserRegistrationForm';

// Import Actions
import { addUserRequest } from '../../UserActions';

class UserRegistrationPage extends Component {
  // we aren't loading any data yet.
  //componentDidMount() {
  //  this.props.dispatch([]);
  //}

  handleAddUser = (firstName, lastName, email) => {
    this.props.dispatch(addUserRequest({ firstName, lastName, email }));
  };

  render() {
    return (
      <div>
        <RegistrationForm addUser={this.handleAddUser} />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps() {
  return {};
}

UserRegistrationPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })),
  dispatch: PropTypes.func.isRequired,
};

UserRegistrationPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(UserRegistrationPage);
