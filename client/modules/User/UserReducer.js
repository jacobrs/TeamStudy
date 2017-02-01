import { ADD_USER, LOGIN_USER } from './UserActions';

// Initial State
const initialState = { data: [] };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER :
      return {
        data: [action.user, ...state.data],
      };

    case LOGIN_USER:
      let data = [...state.data];
      if(action.status == 200){
        data.user = action.user;
      }else{
        data.user = null;
      }
      return {
          data: data,
      };

    default:
      return state;
  }
};

// Export Reducer
export default UserReducer;
