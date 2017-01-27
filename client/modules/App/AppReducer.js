// Import Actions
import { TOGGLE_LOGIN } from './AppActions';

// Initial State
const initialState = {
  showLogin: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOGIN:
      return {
        showLogin: !state.showLogin,
      };

    default:
      return state;
  }
};

// Export Reducer
export default AppReducer;
