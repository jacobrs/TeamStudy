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
      if(action.response.statusCode == 200){
        data.user = action.response.user;
      }else{
        data.user = null;
      }
      console.log(data);
      return {
          data: data,
      };

    default:
      return state;
  }
};

// Export Reducer
export default UserReducer;
