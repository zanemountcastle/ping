import { combineReducers } from 'redux';
import MyAppletsReducer from './MyAppletsReducer';
import DiscoveryReducer from './DiscoveryReducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
    applets: MyAppletsReducer,
    discovery: DiscoveryReducer,
    search: SearchReducer
});
