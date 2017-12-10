import {
  FETCHING_DISCOVERY_DATA,
  FETCHING_DISCOVERY_DATA_SUCCESS,
  FETCHING_DISCOVERY_DATA_FAIL,
} from './ActionTypes';

import * as firebase from 'firebase';

export default function FetchDiscoveryData() {
  return dispatch => {

    dispatch({
      type: FETCHING_DISCOVERY_DATA
    });

    return firebase.database().ref('/feeds')
      .on('value', (snapshot) => {
        // gets around Redux panicking about actions in reducers
        setTimeout(() => {
          const discoveryApplets = snapshot.val() || {};
          // const discoveryApplets = snapshot.val || [];
          return dispatch({
            type: FETCHING_DISCOVERY_DATA_SUCCESS,
            payload: discoveryApplets,
          });
        }, 0);
      }, error => {
        return dispatch({
          type: FETCHING_DISCOVERY_DATA_FAIL,
          payload: error,
        })
      });
  }
}
