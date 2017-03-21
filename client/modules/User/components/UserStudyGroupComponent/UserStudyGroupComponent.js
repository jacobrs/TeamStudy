import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { fetchUserGroups } from '../../UserActions'

// Import style
import styles from './UserStudyGroupComponent.css';

function UserStudyGroupComponent(props){
  if((props.users.user.studyGroups).length !== 0){
    return (
      <div className={styles.studyGroup}>
        <h4>Study Groups</h4>
        <ul>
          {(fetchUserGroups(props.user)).map(group => {               // This still needs to be tested once I have groups.
            return <li><Link href="">{group.groupName}</Link></li>;
          })}
        </ul>
      </div>
    );
  }

  return (
    <h1>Loading</h1>
  );
}

export default UserStudyGroupComponent;
