import { 
  ADD_USER, 
  UPDATE_USER, 
  LOGIN_USER, 
  AUTHENTICATE_SESSION, 
  FAILED_AUTHENTICATION, 
  LOGOUT_USER, 
  SET_CURRENT_STUDY_GROUP, 
  PREPARE_CHAT_MESSAGES, 
  PREPARE_CHAT_MESSAGE,
  SHOW_SEARCH_RESULTS
  } from './UserActions';

import { getColorFromUserIndex } from './components/ChatComponent/ChatComponent';
import React from 'react';

// Initial State
const initialState = { data: [], user: null, currentStudyGroup: -1, chat: { messages: [], users: [] }, search: [] };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER :
      return {
        data: [action.user, ...state.data],
      };
    case UPDATE_USER :
      return {
        user: action.user,
        currentStudyGroup: state.currentStudyGroup,
        chat: state.chat,
        search: [],
      };
    case LOGIN_USER: {
      const user = (action.response.statusCode === 200) ? action.response.user : null;

      return {
        user,
        currentStudyGroup: state.currentStudyGroup,
        chat: state.chat,
        search: [],
      };
    }
    case AUTHENTICATE_SESSION: {
      const user = (action.response.statusCode === 200) ? action.response.user : null;

      return {
        user,
        currentStudyGroup: state.currentStudyGroup,
        chat: state.chat,
        search: [],
      };
    }
    case FAILED_AUTHENTICATION: {
      return {
        user: null,
        currentStudyGroup: -1,
        chat: initialState.chat,
        search: [],
      };
    }
    case LOGOUT_USER: {
      return {
        user: null,
        currentStudyGroup: -1,
        chat: initialState.chat,
        search: [],
      };
    }
    case SET_CURRENT_STUDY_GROUP: {
      return {
        user: state.user, // Not sure if this is necessary
        currentStudyGroup: action.studyGroupIndex,
        chat: state.chat,
        search: [],
      };
    }
    case PREPARE_CHAT_MESSAGES: {
      const messages = [];
      const usersInChat = [];

      for (let i = 0; i < action.messages.length; i++) {
        let userIndex = usersInChat.indexOf(action.messages[i].author);
        if (userIndex === -1) {
          usersInChat.push(action.messages[i].author);
          userIndex = usersInChat.length - 1;
        }

        messages.push(<div key={i} style={{ color: getColorFromUserIndex(userIndex) }}>{`${action.messages[i].author}: ${action.messages[i].messageContent}`}</div>);
      }

      return {
        user: state.user,
        currentStudyGroup: state.currentStudyGroup,
        chat: { messages, users: usersInChat },
        search: [],
      };
    }
    case PREPARE_CHAT_MESSAGE: {
      let userIndex = state.chat.users.indexOf(action.message.user);
      if (userIndex === -1) {
        state.chat.users.push(action.message.user);
        userIndex = state.chat.users.length - 1;
      }

      state.chat.messages.push(<div key={state.chat.messages.length + 1} style={{ color: getColorFromUserIndex(userIndex) }}>{`${action.message.user}: ${action.message.message}`}</div>);
      return {
        user: state.user,
        currentStudyGroup: state.currentStudyGroup,
        chat: state.chat,
        search: [],
      };
    }
    case SHOW_SEARCH_RESULTS: {
      if(action.users == undefined){
        action.users = [];
      }
      
      return {
        user: state.user,
        currentStudyGroup: state.currentStudyGroup,
        chat: state.chat,
        search: action.users
      };
    } 
    default:
      return state;
  }
};

// Export Reducer
export default UserReducer;
