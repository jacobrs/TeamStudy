import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { fetchUserGroups } from '../../UserActions'

// Import style
import styles from './UserStudyGroupComponent.css';

function UserStudyGroupComponent(props){
  const arr = [
    { name: 'Dream Team Study' },       // Mock data (study groups)
    { name: 'SOEN 341 Study Group' },
    { name: 'COMP 346 Exam Study' },
    { name: 'Team "Mandy\'s Salad" Discussion' },
  ];

  if (props.users.user !== null) {
    return (
      <div className={styles.studyGroup}>
        <h4>Study Groups</h4>
        <ul>
          {(arr).map((group, i) => {    // Displays group name in array of user study groups. Tested using mock data.
            return <li key={i}><Link href="">{group.name}</Link></li>;    // Missing routes to chat.
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
