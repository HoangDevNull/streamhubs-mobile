import { combineReducers } from 'redux';

import user from './reducers/user';
import gui from './reducers/gui';
import player from './reducers/player';
import snackbar from './reducers/snackbar';

const reducers = combineReducers({
  user,
  gui,
  player,
  snackbar,
});

export default reducers;
