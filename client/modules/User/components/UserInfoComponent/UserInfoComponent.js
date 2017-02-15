import React, { Component, PropTypes } from 'react';

// Import Style
// import styles from './UserInfoComponent.css';

function UserInfoComponent(props) {
  if(Object.keys(props.users).length == 1) // wait props.users not to be null
    return (
      <div>
        <h2>Welcome {props.users.user.firstName} {props.users.user.lastName}</h2>
        <h3>Account created {props.users.user.dateAdded}</h3>
      </div>
    );
  return (
    <h1>Loading</h1>
  )
}


export default UserInfoComponent;
