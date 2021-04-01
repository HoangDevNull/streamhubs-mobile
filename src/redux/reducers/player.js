import {
  SET_CHAT_ROOM_MOBILE,
  SET_FOCUS_PLAYER,
  SET_RESOLUTION,
  SET_OPEN_SETTING,
} from '../types/player';

const initState = {
  openSetting: false,
  showChatRoom: true,
  focus: true,
  resolution: 'auto',
};

const playerReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CHAT_ROOM_MOBILE:
      return {
        ...state,
        showChatRoom: action.payload,
      };
    case SET_FOCUS_PLAYER:
      return {
        ...state,
        focus: action.payload,
      };
    case SET_OPEN_SETTING:
      return {
        ...state,
        openSetting: action.payload,
      };
    case SET_RESOLUTION:
      return {
        ...state,
        resolution: action.payload,
      };

    default:
      return state;
  }
};

export default playerReducer;
