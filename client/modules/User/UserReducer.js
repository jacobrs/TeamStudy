import { ADD_USER, LOGIN_USER } from './UserActions';

// Initial State
const initialState = { data: [], loggedIn: false };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER :
      return {
        data: [action.user, ...state.data],
      };

    case LOGIN_USER:
      let data = [...state.data];
      if (action.response.statusCode == 200) {
        data.user = action.response.user;
        state.loggedIn = true;
      } else {
        data.user = null;
        state.loggedIn = false;
      }
      console.log(data);
      return {
        data,
        loggedIn: state.loggedIn,
      };

    default:
      return state;
  }
};

// Export Reducer
export default UserReducer;
