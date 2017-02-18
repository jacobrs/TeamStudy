import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import UserInfoComponent from '../../components/UserInfoComponent/UserInfoComponent';

class UserDashboardPage extends Component {
  render() {
    console.log('UserDashboardPage');
    console.log(this.props.users);
    return (
      <div>
        <UserInfoComponent users={this.props.users} />
      </div>
    );
  }
}

// map Users from store to Props
function mapStateToProps({ users }) {
  return { users };
}

// Warning issued if prop not provided
UserDashboardPage.propTypes = {
  // email: PropTypes.string,
  // password: PropTypes.string,
  // loginUserRequest: PropTypes.func.isRequired,
};

UserDashboardPage.contextTypes = {
  // router: React.PropTypes.object,
};

export default connect(mapStateToProps)(UserDashboardPage);
