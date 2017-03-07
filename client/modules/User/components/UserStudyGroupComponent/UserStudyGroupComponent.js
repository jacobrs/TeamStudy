import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

// Import style
import styles from './UserStudyGroupComponent.css';

function UserStudyGroupComponent(props){
  if(Object.keys(props.users).length === 1){
    return (
      <div className={styles.studyGroup}>
        <h4>Study Groups</h4>
        <ul>
          <li><Link href="">SOEN 331</Link></li>
          <li><Link href="">SOEN 341</Link></li>
          <li><Link href="">ELEC 275</Link></li>
        </ul>
      </div>
    );
  }

  return (
    <h1>Loading</h1>
  );
}

export default UserStudyGroupComponent;
