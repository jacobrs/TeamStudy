import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import Components
import UserInfoComponent from '../../components/UserInfoComponent/UserInfoComponent';
import UserStudyGroupComponent from '../../components/UserStudyGroupComponent/UserStudyGroupComponent';

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
        <div>
          <UserInfoComponent users={this.props.users} />
          <UserStudyGroupComponent users={this.props.users} />
        </div>
      );
    }

    return (
      <div id={styles['loading-container']}>
        <div id={styles['loading-icon']}>
          <i className="fa fa-refresh fa-spin fa-5x fa-fw"></i>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
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
  // email: PropTypes.string,
  // password: PropTypes.string,
  // loginUserRequest: PropTypes.func.isRequired,
  authenticateSessionRequest: PropTypes.func.isRequired,
  users: PropTypes.object,
};

UserDashboardPage.contextTypes = {
  // router: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardPage);
