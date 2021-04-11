import { combineReducers } from 'redux';

import user from './reducers/user';
import gui from './reducers/gui';
import player from './reducers/player';
import snackbar from './reducers/snackbar';
import following from './reducers/following';
import socket from './reducers/socket';
import detailStream from './reducers/detailStream';

const reducers = combineReducers({
  user,
  gui,
  player,
  snackbar,
  following,
  socket,
  detailStream,
});

export default reducers;
