import { combineReducers } from 'redux';
import AppletReducer from './AppletReducer';

export default combineReducers({
    applets: AppletReducer
});
