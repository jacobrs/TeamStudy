import React, { Component, PropTypes } from 'react';
import { injectIntl } from 'react-intl';
import io from 'socket.io-client';

// Import Style
import styles from './ChatComponent.css';

const COLORS = [
  'Black',
  // 'Maroon', ugly color
  //'Yellow',
  // 'Olive', also ugly color
  //'Lime',
  //'Green',
  //'Aqua',
  //'Teal',
  //'Blue',
  //'Navy',
  //'Fuchsia',
  //'Purple',
];

// Ensure we have a color for every user, if we are out of colors just wrap back around.
export function getColorFromUserIndex(index) {
  return COLORS[index % COLORS.length];
}

export class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.socket = null;
    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onMessageReceive = this.onMessageReceive.bind(this);
  }

  componentWillMount() {
    console.log('Will Mount');
    this.chatTitle = (this.props.users.currentStudyGroup == -1)?"":this.props.users.user.studyGroups[this.props.users.currentStudyGroup].groupName;
    this.socket = io.connect();
    this.socket.emit('UserSignedIn', `${this.props.users.user.firstName} ${this.props.users.user.lastName}`);
    this.socket.on('UpdateMessages', this.onMessageReceive);
  }

  componentWillUpdate(nextProps, nextState) {
    this.chatTitle = (this.props.users.currentStudyGroup == -1)?"":this.props.users.user.studyGroups[this.props.users.currentStudyGroup].groupName;
  }

  componentWillUnmount() {
    console.log('Will Unmount');
    this.socket.disconnect();
  }

  onMessageReceive(data) {
    this.props.prepareChatMessage(data);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleKeyDown(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      this.sendMessage();
      event.preventDefault();
    }
  }

  sendMessage() {
    if (this.state.value !== '') {
      this.socket.emit('SaveMessage', {
        message: this.state.value,
        studyGroup: this.props.users.user.studyGroups[this.props.users.currentStudyGroup].guid,
      });
      this.state.value = '';
    }
  }

  // Display form
  render() {
    if (this.props.users.currentStudyGroup <= -1) {
      return null;
    }

    return (
      <div className="col-md-9 animated fadeInRight" id={styles['message-wrapper']}>
        <div id={styles['chat-menu']}>
          <span id={styles['chat-title']}>{this.chatTitle}</span>
          <span id={styles['add-link']}><i className="fa fa-plus"></i> Add Members</span>
        </div>
        <div className="row-md-3 border rounded" id={styles['message-area']}>
            {this.props.users.chat.messages}
        </div>
        <div className="row" id={styles['message-input']}>
          <textarea className="col-md-9 form-control" rows="3" placeholder="Write a message to the group"
          value={this.state.value} onKeyDown={this.handleKeyDown} onChange={this.handleChange} ></textarea>
          <button className="col-md-3 btn btn-primary" onClick={this.sendMessage} id={styles['message-send']}>Send</button>
        </div>
      </div>
    );
  }
}

// Warning issued if prop not provided
ChatComponent.propTypes = {
  users: PropTypes.object.isRequired,
};

export default injectIntl(ChatComponent);
