import { INIT_STREAM_DATA } from '../types/detailStream';
export const initStreamData = (payload) => {
  return {
    type: INIT_STREAM_DATA,
    payload,
  };
};
