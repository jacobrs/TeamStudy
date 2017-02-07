import { browserHistory } from 'react-router';

// Export Constants
export const ADD_USER = 'ADD_USER';
export const LOGIN_USER = 'LOGIN_USER';

// Export Actions
export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export function loginUser(response) {
  console.log(response);
  if (response.statusCode === 200) {
    browserHistory.replace('/profile');
  }

  return {
    type: LOGIN_USER,
    response
  };
}
