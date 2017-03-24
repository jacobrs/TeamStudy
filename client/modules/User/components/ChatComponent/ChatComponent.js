import React, { Component, PropTypes } from 'react';
import { injectIntl } from 'react-intl';
import io from 'socket.io-client';

// Import Style
import styles from './ChatComponent.css';

const COLORS = [
  'Red',
  // 'Maroon', ugly color
  'Yellow',
  // 'Olive', also ugly color
  'Lime',
  'Green',
  'Aqua',
  'Teal',
  'Blue',
  'Navy',
  'Fuchsia',
  'Purple',
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
    this.socket = io.connect();
    this.socket.emit('UserSignedIn', `${this.props.users.user.firstName} ${this.props.users.user.lastName}`);
    this.socket.on('UpdateMessages', this.onMessageReceive);

    this.props.setChat(0);
  }

  componentWillUpdate(nextProps, nextState) {

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
    // TODO once currentStudyGroup is working check whether I should show the chat or not
    return (
      <div className="col-md-9">
        <div className="row-md-3 border rounded" id={styles['message-area']}>
            {this.props.users.chat.messages}
        </div>
        <div className="row">
          <textarea className="col-md-11 form-control" rows="3" value={this.state.value} onKeyDown={this.handleKeyDown} onChange={this.handleChange} ></textarea>
          <button className="col-md-1 btn btn-primary" onClick={this.sendMessage}>Send</button>
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
