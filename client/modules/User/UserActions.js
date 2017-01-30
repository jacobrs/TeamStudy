import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_USER = 'ADD_USER';
export const VERIFY_USER = 'VERIFY_USER';

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

// Need to validate that user exists - retrieve data
// export function verifyUserRequest(user) {
  /* return (dispatch) => {
    return callApi('users', 'user', {
      user: {
        email: user.email,
        password: user.password,
      },
    }).then(res => dispatch(verifyUser(res.user)));
  };*/
// }
