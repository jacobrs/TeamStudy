import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_USER = 'ADD_USER';

// Export Actions
export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export function addUserRequest(user) {
  return (dispatch) => {
    return callApi('users', 'user', {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    }).then(res => dispatch(addUser(res.user)));
  };
}
