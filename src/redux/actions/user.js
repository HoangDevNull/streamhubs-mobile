import { SAVE_USER_INFO, LOGOUT, SET_THEME, SET_TAGS } from '../types/user';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLoginInfo = (payload) => {
  return async (dispatch) => {
    await AsyncStorage.setItem('user', JSON.stringify(payload));
    return dispatch({
      type: SAVE_USER_INFO,
      payload,
    });
  };
};

export const updateUserProfile = (payload) => {
  return {
    type: SAVE_USER_INFO,
    payload,
  };
};

export const logout = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem('user');
    return dispatch({
      type: LOGOUT,
    });
  };
};

export const setTheme = (payload) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    user.theme = payload;
    await AsyncStorage.setItem('user', JSON.stringify(user));

    dispatch({
      type: SET_THEME,
      payload,
    });
  };
};

export const setTags = (payload) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    user.tags = payload;
    await AsyncStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: SET_TAGS,
      payload,
    });
  };
};
