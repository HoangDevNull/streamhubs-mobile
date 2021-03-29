import { INIT_FOLLOWING_DATA } from '../types/following';

export const initFollowingData = (payload) => {
  return {
    type: INIT_FOLLOWING_DATA,
    payload,
  };
};
