import {
  SET_CHAT_ROOM_MOBILE,
  SET_FOCUS_PLAYER,
  SET_PLAYING,
} from '../types/player';

export const setPlayStatus = (payload) => {
  return {
    type: SET_PLAYING,
    payload,
  };
};
export const toggleChatRoom = (payload) => {
  return {
    type: SET_CHAT_ROOM_MOBILE,
    payload,
  };
};
export const setFocus = (payload) => {
  return {
    type: SET_FOCUS_PLAYER,
    payload,
  };
};
