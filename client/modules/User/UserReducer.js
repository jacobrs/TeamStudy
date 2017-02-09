import { ADD_USER, UPDATE_USER, LOGIN_USER } from './UserActions';

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

      console.log(user);

      return {
        user,
      };
    }
    default:
      return state;
  }
};

// Export Reducer
export default UserReducer;
