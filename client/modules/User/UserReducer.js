import { ADD_USER, UPDATE_USER, LOGIN_USER, AUTHENTICATE_SESSION, FAILED_AUTHENTICATION, LOGOUT_USER } from './UserActions';

// Initial State
const initialState = { data: [], user: null };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER :
      return {
        data: [action.user, ...state.data],
      };
    case UPDATE_USER :
      return {
        user: action.user,
      };
    case LOGIN_USER: {
      const user = (action.response.statusCode === 200) ? action.response.user : null;

      return {
        user,
      };
    }
    case AUTHENTICATE_SESSION: {
      const user = (action.response.statusCode === 200) ? action.response.user : null;

      return {
        user,
      };
    }
    case FAILED_AUTHENTICATION: {
      return {
        user: null,
      };
    }
    case LOGOUT_USER: {
      return {
        user: null,
      };
    }
    default:
      return state;
  }
};

// Export Reducer
export default UserReducer;
