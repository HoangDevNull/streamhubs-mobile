import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

// setup redux store and apply redux saga. also add redux dev tool
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
