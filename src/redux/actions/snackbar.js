import { SET_SNACKBAR } from '../types/snackbar';

export const setSnackbar = (payload) => {
  return {
    type: SET_SNACKBAR,
    payload,
  };
};
