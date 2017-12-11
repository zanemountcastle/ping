import { combineReducers } from 'redux';
import MyAppletsReducer from './MyAppletsReducer';
import DiscoveryReducer from './DiscoveryReducer';
import SearchReducer from './SearchReducer';
import CreateAnAppletReducer from './CreateAnAppletReducer';

export default combineReducers({
    applets: MyAppletsReducer,
    discovery: DiscoveryReducer,
    search: SearchReducer,
    create: CreateAnAppletReducer,
});
