import { INIT_STREAM_DATA } from '../types/detailStream';

const initState = {
  banner: '',
  category: null,
  categoryID: 0,
  channelStatusID: 0,
  createdAt: null,
  description: null,
  endPoint: null,
  follower: 2,
  owner: null,
  ownerID: 0,
  viewers: 0,
};

const detailStreamReducer = (state = initState, action) => {
  switch (action.type) {
    case INIT_STREAM_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default detailStreamReducer;
