import {SAVE_AUTH_INFO, LOGOUT} from '../types/auth';

const initState = {
  email: null,
  access_token: null,
  isLoggedIn: false,
  userProfile: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SAVE_AUTH_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return initState;
    default:
      return state;
  }
};

export default authReducer;
