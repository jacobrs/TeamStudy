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
function getColorFromUserIndex(index) {
  return COLORS[index % COLORS.length];
}

export class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.populateMessages = this.populateMessages.bind(this);
    this.socket = null;
  }

  componentWillMount() {
    console.log('Will Mount');
    console.log(this.props.users);
    this.socket = io.connect();
    this.populateMessages();
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('Will Update');
    this.populateMessages();
  }

  componentWillUnmount() {
    console.log('Will Unmount');
  }

  populateMessages() {
    this.state.messages = [];
    // Test messages for now
    for (let i = 0; i < 100; i++) {
      this.state.messages.push(<div key={i} style={{ color: getColorFromUserIndex(i) }}>Hello</div>);
    }
  }

  // Display form
  render() {
    // TODO once currentStudyGroup is working check whether I should show the chat or not
    return (
      <div className="col-md-9">
        <div className="row-md-3 border rounded" id={styles['message-area']}>
            {this.state.messages}
        </div>
        <div className="row">
          <textarea className="col-md-11 form-control" rows="3"></textarea>
          <button className="col-md-1 btn btn-primary">Send</button>
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
