import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import callApi from '../../../../util/apiCaller';

// Import Components
import UserUpdateForm from '../../components/UserUpdateForm/UserUpdateForm';

// Import Actions
import { updateUserRequest } from '../../UserActions';

class UserEditInfoPage extends Component {
  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser = (firstName, lastName, studentId, email, password) => {
    this.props.updateUserRequest({
      firstName,
      lastName,
      studentId,
      email,
      password,
    });
  };

  render() {
    return (
      <div>
        <UserUpdateForm updateUser={this.updateUser} />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateUserRequest }, dispatch);
}

UserEditInfoPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    studentId: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  })),
  updateUserRequest: PropTypes.func.isRequired,
};

UserEditInfoPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(null, mapDispatchToProps)(UserEditInfoPage);
