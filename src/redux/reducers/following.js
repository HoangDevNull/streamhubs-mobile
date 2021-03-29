import { INIT_FOLLOWING_DATA } from '../types/following';

const initState = {
  categories: [],
  liveChannel: [],
  suggestChannel: [],
  followedStreamer: [],
};

const FollowingReducer = (state = initState, action) => {
  switch (action.type) {
    case INIT_FOLLOWING_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default FollowingReducer;
