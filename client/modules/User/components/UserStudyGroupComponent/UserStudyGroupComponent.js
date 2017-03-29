import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { fetchUserGroups } from '../../UserActions'

// Import style
import styles from './UserStudyGroupComponent.css';

export class UserStudyGroupComponent extends Component{
  constructor(props){
    super(props);
  }

  handleClick (i, event){
    this.props.setChat(i);
  }

  render(){
    if ((this.props.users.user.studyGroups).length !== 0) {
      return (
        <div className={styles.studyGroup}>
          <h4>Study Groups</h4>
          <ul>
            {(this.props.users.user.studyGroups).map((group, i) => {
              return <li key={i} onClick={this.handleClick.bind(this, i)}>{group.groupName}</li>;
            })}
          </ul>
        </div>
      );
    }
    return (
      <h1>Loading</h1>
    );
  }
}

export default UserStudyGroupComponent;
