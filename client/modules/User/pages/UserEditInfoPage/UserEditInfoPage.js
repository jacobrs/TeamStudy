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
    this.user = props.user;
  }

  updateUser = (firstName, lastName, studentId, email, password, cuid) => {
    this.props.updateUserRequest({
      firstName,
      lastName,
      studentId,
      email,
      password,
      cuid,
    });
  };

  render() {
    return (
      <div>
        <UserUpdateForm updateUser={this.updateUser} user={this.user} />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateUserRequest }, dispatch);
}

function mapStateToProps({ users }) {
  return users;
}

UserEditInfoPage.propTypes = {
  users: PropTypes.object,
  updateUserRequest: PropTypes.func.isRequired,
};

UserEditInfoPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditInfoPage);
