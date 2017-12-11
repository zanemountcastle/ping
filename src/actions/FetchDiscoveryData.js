import {
  FETCHING_DISCOVERY_DATA,
  FETCHING_DISCOVERY_DATA_SUCCESS,
  FETCHING_DISCOVERY_DATA_FAIL,
} from './ActionTypes';

import * as firebase from 'firebase';

export default function FetchDiscoveryData() {
  return dispatch => {

    // Let the application know that we've started to fetch
    dispatch({
      type: FETCHING_DISCOVERY_DATA
    });

    let discoveryApplets = {};

    firebase.database()
      .ref(`/discovery`)
      .once('value')
      .then((snapshot) => {

        let reads = [];
        // Loop through each applet by ID
        snapshot.forEach((discovery_applet) => {
          // Fetch the rendering data for each applet
          const appletID = discovery_applet.key;
          // Push a fetch promise into an array for every request that has to happen
          const promise = firebase.database().ref(`/feeds/${appletID}/metadata`)
            .once('value')
            .then((applet_snapshot) => {
              // Add each applet's data to a `subscriptions` object
              discoveryApplets[appletID] = applet_snapshot.val();
            }, (error) => console.log("ERROR:", error));
          reads.push(promise)
        });

        // Finally execute all Firebase request promises, and then return
        return Promise.all(reads); // THIS IS WITCHCRAFT

      }).then(()=> {
        return dispatch({
          type: FETCHING_DISCOVERY_DATA_SUCCESS,
          payload: discoveryApplets,
        });
      }, (error) => {
        return dispatch({
          type: FETCHING_DISCOVERY_DATA_FAIL,
          payload: error,
        });
      });
  }
}
