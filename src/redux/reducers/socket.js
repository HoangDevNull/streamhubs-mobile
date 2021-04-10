import { INIT_SOCKET } from '../types/socket';

const initState = {
  socketInstance: null,
  socketAuth: false,
};

export default socketReducer = (state = initState, action) => {
  switch (action.type) {
    case INIT_SOCKET:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
