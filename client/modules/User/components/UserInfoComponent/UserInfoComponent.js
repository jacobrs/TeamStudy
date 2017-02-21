import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
// Import Style
import styles from './UserInfoComponent.css';

function UserInfoComponent(props) {
  if (Object.keys(props.users).length === 1) { // wait props.users not to be null
    return (
      <div className="col-md-3" id={styles.sidebar}>
        <img className="img-circle" id={styles['circle-image']}src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/15/09/jon-snow.jpg" />
        <h3>{props.users.user.firstName}                                          {props.users.user.lastName} </h3>
        <p>{props.users.user.email} </p>
        <ul>
          <li><Link>Course 1</Link></li>
          <li><Link>Course 2</Link></li>
          <li><Link>Course 3</Link></li>
          <li><Link>Course 4</Link></li>
          <li><Link>Course 5</Link></li>
        </ul>
      </div>
    );
  }
  return (
    <h1>Loading</h1>
  );
}


export default UserInfoComponent;

