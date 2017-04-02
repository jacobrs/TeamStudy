import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import UserStudyGroupComponent from '../UserStudyGroupComponent/UserStudyGroupComponent';

// Import Style
import styles from './UserInfoComponent.css';

function UserInfoComponent(props) {
  if (props.users.user !== null) { // wait props.users not to be null
    return (
      <div className="col-md-3" id={styles.sidebar}>
        <img className="img-circle" id={styles['circle-image']}src="/static/images/user.png" />
        <div className="btn-toolbar pull-right">
          <div className="btn-group">
            <Link type="button" className={`btn btn-primary ${styles['edit-button']}`} to="/editInfo">Edit</Link>
          </div>
        </div>
        <h3>{props.users.user.firstName}&nbsp;{props.users.user.lastName}</h3>
        <p>{props.users.user.email} </p>
        <UserStudyGroupComponent users={props.users} setChat={props.setChat} />
      </div>
    );
  }
  return (
    <h1>Loading</h1>
  );
}


export default UserInfoComponent;

