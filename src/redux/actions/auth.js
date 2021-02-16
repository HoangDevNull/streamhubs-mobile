import {SAVE_AUTH_INFO, LOGOUT} from '../types/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLoginInfo = (payload) => {
  return async (dispatch, getState) => {
    const {auth} = getState();
    console.log({auth});
    await AsyncStorage.setItem('auth', JSON.stringify(payload));

    return dispatch({
      type: SAVE_AUTH_INFO,
      payload,
    });
  };
};
