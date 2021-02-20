import { combineReducers } from 'redux';

import user from './reducers/user';
import gui from './reducers/gui';

const reducers = combineReducers({
  user,
  gui,
});

export default reducers;
