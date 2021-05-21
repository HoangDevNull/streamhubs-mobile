import { SAVE_USER_INFO, LOGOUT, SET_THEME, SET_TAGS } from '../types/user';

const initState = {
  email: null,
  access_token: null,
  isLoggedIn: false,
  userProfile: null,
  channel: null,
  theme: 'dark',
  tags: [],
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SAVE_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        email: null,
        access_token: null,
        isLoggedIn: false,
        userProfile: null,
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case SET_TAGS:
      return {
        ...state,
        tags: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
