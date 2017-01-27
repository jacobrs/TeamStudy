import { ADD_USER } from './UserActions';

// Initial State
const initialState = { data: [] };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER :
      return {
        data: [action.user, ...state.data],
      };

    default:
      return state;
  }
};

// Export Reducer
export default UserReducer;
