import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

// Export Constants
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const AUTHENTICATE_SESSION = 'AUTHENTICATE_SESSION';

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
  return (dispatch) => {
    return callApi('users', 'put', {
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

export function authenticateSession(response) {
  // Failed to authenticate, redirect to landing page
  if (response.statusCode !== 200) {
    browserHistory.replace('/');
  }
  return {
    type: AUTHENTICATE_SESSION,
    response,
  };
}

export function authenticateSessionRequest() {
  return (dispatch) => {
    return callApi('users/me').then(res => dispatch(authenticateSession(res)));
  };
}
