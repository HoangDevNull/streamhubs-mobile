import { OPEN_USER_SETTING } from '../types/gui';

const initState = {
  openUserSetting: false,
};

const UIReducer = (state = initState, action) => {
  switch (action.type) {
    case OPEN_USER_SETTING:
      return {
        ...state,
        openUserSetting: action.payload,
      };

    default:
      return state;
  }
};

export default UIReducer;
