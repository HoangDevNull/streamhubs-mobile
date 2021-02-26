import {
  SET_CHAT_ROOM_MOBILE,
  SET_FOCUS_PLAYER,
  SET_PLAYING,
} from '../types/player';

const initState = {
  showChatRoom: true,
  focus: true,
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

    default:
      return state;
  }
};

export default playerReducer;
