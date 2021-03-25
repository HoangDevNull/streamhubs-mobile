import { SET_SNACKBAR } from '../types/snackbar';

const initState = {
  open: false,
  text: '',
};

const SnackbarReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SNACKBAR:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default SnackbarReducer;
