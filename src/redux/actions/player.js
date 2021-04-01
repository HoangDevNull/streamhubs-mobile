import {
  SET_CHAT_ROOM_MOBILE,
  SET_FOCUS_PLAYER,
  SET_OPEN_SETTING,
  SET_RESOLUTION,
} from '../types/player';

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
export const openSetting = (payload) => {
  return {
    type: SET_OPEN_SETTING,
    payload,
  };
};
export const setResolution = (payload) => {
  return {
    type: SET_RESOLUTION,
    payload,
  };
};
