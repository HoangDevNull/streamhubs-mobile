import { SAVE_USER_INFO, LOGOUT, SET_THEME } from '../types/user';

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

export const logout = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem('user');
    return dispatch({
      type: LOGOUT,
    });
  };
};

export const setTheme = (payload) => {
  return {
    type: SET_THEME,
    payload,
  };
};
