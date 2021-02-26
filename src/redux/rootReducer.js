import { combineReducers } from 'redux';

import user from './reducers/user';
import gui from './reducers/gui';
import player from './reducers/player';

const reducers = combineReducers({
  user,
  gui,
  player,
});

export default reducers;
