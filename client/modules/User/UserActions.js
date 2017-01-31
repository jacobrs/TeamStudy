import callApi from '../../util/apiCaller';

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

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    user
  }
}

export function loginUserRequest(user) {
  return (dispatch) => {
    return callApi('users', '')
  }
}
