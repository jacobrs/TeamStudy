import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { fetchUserGroups } from '../../UserActions';

// Import style
import styles from './UserStudyGroupComponent.css';

export class UserStudyGroupComponent extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(i, event) {
    this.props.setChat(i);
  }

  render() {
    if ((this.props.users.user.studyGroups).length !== 0) {
      return (
        <div className={styles.studyGroup}>
          <h3 className={styles.title}>Study Groups</h3>
          {(this.props.users.user.studyGroups).map((group, i) => {
            return <button key={i} onClick={this.handleClick.bind(this, i)} className={"btn btn-info btn-round " + styles.chatLink}>
              <i className="material-icons">people</i> {group.groupName}
            </button>;
          })}
        </div>
      );
    }
    return (
      <h3>No study groups :(</h3>
    );
  }
}

export default UserStudyGroupComponent;
