import { INIT_SOCKET } from '../types/socket';

export const initSocket = (payload) => {
  return { type: INIT_SOCKET, payload };
};
