import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import Components
import UserInfoComponent from '../../components/UserInfoComponent/UserInfoComponent';
import ChatComponent from '../../components/ChatComponent/ChatComponent';

import { authenticateSessionRequest } from '../../UserActions';

import styles from './UserDashboardPage.css';

class UserDashboardPage extends Component {
  componentWillMount() {
    // If I do not have any user data attempt to authenticate using cookie
    if (this.props.users.user == null) {
      this.props.authenticateSessionRequest();
    }
  }

  render() {
    if (this.props.users.user != null) {
      return (
        <div className={`row ${styles.dashboardContainer}`}>
          <UserInfoComponent users={this.props.users} />
          <ChatComponent users={this.props.users} />
        </div>
      );
    }

    return null;
  }
}

// Bind actions to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ authenticateSessionRequest }, dispatch);
}

// map Users from store to Props
function mapStateToProps({ users }) {
  return { users };
}

// Warning issued if prop not provided
UserDashboardPage.propTypes = {
  authenticateSessionRequest: PropTypes.func.isRequired,
  users: PropTypes.object,
};

UserDashboardPage.contextTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardPage);
