import { OPEN_USER_SETTING } from '../types/gui';

export const openUserSetting = (payload) => {
  return {
    type: OPEN_USER_SETTING,
    payload,
  };
};
