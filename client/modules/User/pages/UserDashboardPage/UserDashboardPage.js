import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import Components
import UserInfoComponent from '../../components/UserInfoComponent/UserInfoComponent';
import ChatComponent from '../../components/ChatComponent/ChatComponent';

import { authenticateSessionRequest, switchChat, setCurrentStudyGroup, prepareChatMessage } from '../../UserActions';

import styles from './UserDashboardPage.css';

class UserDashboardPage extends Component {
  constructor(props) {
    super(props);
    this.setChat = this.setChat.bind(this);
  }
  componentWillMount() {
    // If I do not have any user data attempt to authenticate using cookie
    if (this.props.users.user == null) {
      this.props.authenticateSessionRequest();
    }
  }

  setChat(studyGroupIndex) {
    this.props.setCurrentStudyGroup(studyGroupIndex);
    this.props.switchChat(studyGroupIndex, this.props.users.user.studyGroups[studyGroupIndex]);
  }

  render() {
    if (this.props.users.user != null) {
      return (
        <div className={`row ${styles.dashboardContainer}`}>
          <UserInfoComponent users={this.props.users} setChat={this.setChat} />
          <ChatComponent users={this.props.users} setChat={this.setChat} prepareChatMessage={this.props.prepareChatMessage} />
        </div>
      );
    }

    return null;
  }
}

// Bind actions to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ authenticateSessionRequest, switchChat, setCurrentStudyGroup, prepareChatMessage }, dispatch);
}

// map Users from store to Props
function mapStateToProps({ users }) {
  return { users };
}

// Warning issued if prop not provided
UserDashboardPage.propTypes = {
  authenticateSessionRequest: PropTypes.func.isRequired,
  setCurrentStudyGroup: PropTypes.func.isRequired,
  switchChat: PropTypes.func.isRequired,
  prepareChatMessage: PropTypes.func.isRequired,
  users: PropTypes.object,
};

UserDashboardPage.contextTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardPage);
