import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import UserStudyGroupComponent from '../UserStudyGroupComponent/UserStudyGroupComponent';

// Import Style
import styles from './UserInfoComponent.css';

function UserInfoComponent(props) {
  if (Object.keys(props.users).length === 1) { // wait props.users not to be null
    return (
      <div className="col-md-3" id={styles.sidebar}>
        <img className="img-circle" id={styles['circle-image']}src="/static/images/user.png" />
        <h3>{props.users.user.firstName}&nbsp;{props.users.user.lastName}</h3>
        <p>{props.users.user.email} </p>
        <UserStudyGroupComponent users={props.users} />
      </div>
    );
  }
  return (
    <h1>Loading</h1>
  );
}


export default UserInfoComponent;

