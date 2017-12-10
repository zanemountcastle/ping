import { combineReducers } from 'redux';
import AppletReducer from './AppletReducer';
import DiscoveryReducer from './DiscoveryReducer';

export default combineReducers({
    applets: AppletReducer,
    discovery: DiscoveryReducer,
});
