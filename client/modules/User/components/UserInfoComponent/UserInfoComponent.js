import React, { Component, PropTypes } from 'react';

// Import Style
import styles from './UserInfoComponent.css';

function UserInfoComponent(props) {
  if(Object.keys(props.users).length == 1) // wait props.users not to be null
    return (
      <div className="col-md-3" id={styles.sidebar}>
        <img className="img-circle" id={styles['circle-image']}src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/15/09/jon-snow.jpg" />
        <h3>{props.users.user.firstName}  {props.users.user.lastName} </h3>
        <p>{props.users.user.email} </p>
        <ul>
          <li><a href="#">Course 1</a></li>
          <li><a href="#">Course 2</a></li>
          <li><a href="#">Course 3</a></li>
          <li><a href="#">Course 4</a></li>
          <li><a href="#">Course 5</a></li>
        </ul>
      </div>
    );
  return (
    <h1>Loading</h1>
  )
}


export default UserInfoComponent;


