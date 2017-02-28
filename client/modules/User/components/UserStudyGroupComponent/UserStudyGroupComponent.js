import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

//Import style
import styles from './UserStudyGroupComponent.css';

function UserStudyGroupComponent(props){
  if(Object.keys(props.users).length === 1){
    return (
      <div className={styles.studyGroup}>
        <ul>
          <li><Link href="">/*{props.users.user.studyGroups.groupName}*/TESTING</Link></li>
        </ul>
      </div>
    );
  }
  return (
    <h1>Loading</h1>
  );
}

export default UserStudyGroupComponent;
