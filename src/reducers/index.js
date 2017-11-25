import { combineReducers } from 'redux';
import * as pingsReducer from './pings';

export default combineReducers(Object.assign(
  pingsReducer,
));
