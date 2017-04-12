import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

// Export Constants
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const AUTHENTICATE_SESSION = 'AUTHENTICATE_SESSION';
export const FAILED_AUTHENTICATION = 'FAILED_AUTHENTICATION';
export const CREATE_GROUP = 'CREATE_GROUP';
export const SET_CURRENT_STUDY_GROUP = 'SET_CURRENT_STUDY_GROUP';
export const PREPARE_CHAT_MESSAGES = 'PREPARE_CHAT_MESSAGES';
export const PREPARE_CHAT_MESSAGE = 'PREPARE_CHAT_MESSAGE';
export const SHOW_SEARCH_RESULTS = 'SHOW_SEARCH_RESULTS';
export const ADD_USER_TO_CHAT = 'ADD_USER_TO_CHAT';

// Auth Pages
export const DASHBOARD_PAGE = 'DASHBOARD_PAGE';
export const LOGIN_PAGE = 'LOGIN_PAGE';
export const LOGOUT_USER = 'LOGOUT_USER';

// Export Actions
export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export function addUserRequest(user) {

  return (dispatch) => {
    return callApi('users', 'post', {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        studentId: user.studentId,
        email: user.email,
        password: user.password,
      },
    }).then(res => dispatch(addUser(res.user)));
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user,
  };
}

export function updateUserRequest(user) {
  let cuid = `users/${user.cuid}`;
  console.log(user);
  return (dispatch) => {
    return callApi(cuid, 'put', {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        studentId: user.studentId,
        email: user.email,
        password: user.password,
      },
    }).then(res => dispatch(updateUser(res.user)));
  };
}

export function loginUser(response) {
  if (response.statusCode === 200) {
    browserHistory.replace('/profile');
  }

  return {
    type: LOGIN_USER,
    response,
  };
}

export function loginUserRequest(user) {
  return (dispatch) => {
    return callApi('users/login', 'post', {
      password: user.password,
      email: user.email,
    }).then(res => dispatch(loginUser(res)));
  };
}

export function authenticateSession(response, page) {
  // Failed to authenticate, redirect to landing page
  switch (page) {
    case DASHBOARD_PAGE:
      if (response.statusCode !== 200) {
        browserHistory.replace('/');
      }
      return {
        type: AUTHENTICATE_SESSION,
        response,
      };
      break;

    case LOGIN_PAGE:
      if (response.statusCode === 200) {
        browserHistory.replace('/profile');
      }
      return {
        type: FAILED_AUTHENTICATION,
        response,
      };
      break;
    default:
      break;
  }
}

export function authenticateSessionRequest(page = DASHBOARD_PAGE) {
  return (dispatch) => {
    return callApi('users/me').then(res => dispatch(authenticateSession(res, page)));
  };
}

export function logoutUser(response) {
  // We successfully logged out, redirect to the landing page
  if (response.statusCode === 200) {
    browserHistory.replace('/');
  }
  return {
    type: LOGOUT_USER,
    response,
  };
}

// Will probably always succeed but let's keep it consistant
export function logoutUserRequest() {
  return (dispatch) => {
    return callApi('users/logout').then(res => dispatch(logoutUser(res)));
  };
}


export function createStudyGroup(studyGroup) {
  browserHistory.replace('/profile');
  return {
    type: CREATE_GROUP,
    studyGroup,
  };
}

export function createStudyGroupRequest(user,studyGroup) {
  return (dispatch) => {
    return callApi('studyGroups', 'post', {
        cuid: user.user.cuid,
        studyGroup: {
          groupName: studyGroup.groupName,
          course: studyGroup.course,
          teacher: studyGroup.teacher,
          description: studyGroup.description,
        },
    }).then(res => dispatch(createStudyGroup(res.studyGroup)))
    .then(res => dispatch(authenticateSessionRequest()));
  };
}

export function setCurrentStudyGroup(studyGroupIndex) {
  return {
    type: SET_CURRENT_STUDY_GROUP,
    studyGroupIndex,
  };
}

export function prepareChatMessages(messages) {
  return {
    type: PREPARE_CHAT_MESSAGES,
    messages,
  };
}

export function getUsersByEmailRequest(term){
  let request = `users/search/${term}`;
  return (dispatch) => {
    return callApi(request).then(res => dispatch(showUsersByEmail(res.users)));
  };
}

export function showUsersByEmail(users){
  return {
    type: SHOW_SEARCH_RESULTS,
    users,
  }
}

export function addUserToChat(guid, cuid){
  return (dispatch) => {
    return callApi(`studyGroups/${guid}/add/${cuid}`);
  };
}

export function prepareChatMessage(message) {
  return {
    type: PREPARE_CHAT_MESSAGE,
    message,
  };
}

export function switchChat(studyGroupIndex, studyGroup) {
  return (dispatch) => {
    return callApi(`message/${studyGroup.guid}`).then(res => dispatch(prepareChatMessages(res.messages)));
  };
}
