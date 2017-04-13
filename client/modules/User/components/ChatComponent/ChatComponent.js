import React, { Component, PropTypes } from 'react';
import { injectIntl } from 'react-intl';
import io from 'socket.io-client';

// Import Style
import styles from './ChatComponent.css';

const COLORS = [
  'DodgerBlue',
  'Crimson',
  'LimeGreen',
  'DarkOrange',
  'DarkOrchid',
  'Gold',
  'Navy',
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
    this.addUserToChat = this.addUserToChat.bind(this);
    this.searchForUsers = this.searchForUsers.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onMessageReceive = this.onMessageReceive.bind(this);
  }

  componentWillMount() {
    this.chatTitle = (this.props.users.currentStudyGroup == -1)?"":this.props.users.user.studyGroups[this.props.users.currentStudyGroup].groupName;
    this.socket = io.connect();
    this.socket.emit('UserSignedIn', `${this.props.users.user.firstName} ${this.props.users.user.lastName}`);
    this.socket.on('UpdateMessages', this.onMessageReceive);
  }

  componentWillUpdate(nextProps, nextState) {
    this.chatTitle = (this.props.users.currentStudyGroup == -1)?"":this.props.users.user.studyGroups[this.props.users.currentStudyGroup].groupName;
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  onMessageReceive(data) {
    if (this.props.users.user.studyGroups[this.props.users.currentStudyGroup].guid == data.studyGroup) {
      this.props.prepareChatMessage(data);      
    }
    this.scrollSmoothToBottom(styles["message-area"]);
  }

  scrollSmoothToBottom(id){
    var div = document.getElementById(id);
    $('#' + id).animate({
      scrollTop: div.scrollHeight - div.clientHeight
    }, 600);
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollSmoothToBottom(styles["message-area"]);
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

  showAddModal(){
    $('#addModal').appendTo('body').modal('show');
  }

  closeAddModal(){
    $('#addModal').modal('hide');
  }

  searchForUsers(){
    this.props.getUsersByEmailRequest($("#search-term").val());
  }

  addUserToChat(uid){
    let guid = this.props.users.user.studyGroups[this.props.users.currentStudyGroup].guid;
    if(uid != undefined){
      alert("User Added!");
      this.props.addUserToChat(guid, uid);
    }
    this.closeAddModal();
  }

  // Display form
  render() {
    if (this.props.users.currentStudyGroup <= -1) {
      return null;
    }

    if(this.props.users.search.length < 1){
      this.props.users.search.push({firstName:"N/A", lastName:"N/A", email:"N/A"});
    }

    return (
      <div className="col-md-9 animated fadeInRight" id={styles['message-wrapper']}>
        <div id={styles['chat-menu']}>
          <span id={styles['chat-title']}>{this.chatTitle}</span>
          <span id={styles['add-link']} onClick={this.showAddModal}><i className="fa fa-plus"></i> Add Members</span>
        </div>
        <div className="border rounded" id={styles['message-area']}>
            {this.props.users.chat.messages}
        </div>
        <div className="row" id={styles['message-input']}>
          <textarea className="col-md-9 form-control" rows="3" placeholder="Write a message to the group..."
          value={this.state.value} onKeyDown={this.handleKeyDown} onChange={this.handleChange} ></textarea>
        </div>        

        <div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" id={styles['modal-header']}>
                <h5 className="modal-title" id="exampleModalLabel">Add a new member</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" id={styles['modal-body']}>
                <form>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="form-control-label">Search by Email:</label>
                    <input type="text" className="form-control" onChange={this.searchForUsers} placeholder="Type an email" id="search-term"/>
                    
                    <table className="table table-hover" id={styles['table']}>
                      <thead>
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                      {  
                        (this.props.users.search).map((u, i) => {
                          return <tr onClick={() => this.addUserToChat(u.cuid)} key={i}><td>{u.firstName}</td><td>{u.lastName}</td><td>{u.email}</td></tr>;
                        })
                      }
                      </tbody>
                    </table>

                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.closeAddModal}>Close</button>
              </div>
            </div>
          </div>
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
