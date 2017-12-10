import { combineReducers } from 'redux';
import MyAppletsReducer from './MyAppletsReducer';
import DiscoveryReducer from './DiscoveryReducer';

export default combineReducers({
    applets: MyAppletsReducer,
    discovery: DiscoveryReducer,
});
