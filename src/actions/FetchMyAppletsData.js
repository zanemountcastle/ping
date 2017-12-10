import {
  FETCHING_APPLET_DATA,
  FETCHING_APPLET_DATA_SUCCESS,
  FETCHING_APPLET_DATA_FAIL,
} from './ActionTypes';

import * as firebase from 'firebase';

export default function FetchMyAppletsData() {
  return dispatch => {

    // Let the application know that we've started to fetch
    dispatch({
      type: FETCHING_APPLET_DATA
    })

    const userID = firebase.auth().currentUser.uid;
    let subscriptions = {};

    firebase.database()
      .ref(`/users/${userID}/applet_subscriptions`)
      .once('value')
      .then((snapshot) => {

        let reads = [];
        // Loop through each applet by ID
        snapshot.forEach((applet_subscription) => {
          // Fetch the rendering data for each applet
          const appletID = applet_subscription.key;
          // Push a fetch promise into an array for every request that has to happen
          const promise = firebase.database().ref(`/feeds/${appletID}/metadata`)
            .once('value')
            .then((applet_snapshot) => {
              // Add each applet's data to a `subscriptions` object
              subscriptions[appletID] = applet_snapshot.val();
            }, (error) => console.log("ERROR:", error));
          reads.push(promise)
        });

        // Finally execute all Firebase request promises, and then return
        return Promise.all(reads); // THIS IS WITCHCRAFT

      }).then(()=> {
        return dispatch({
          type: FETCHING_APPLET_DATA_SUCCESS,
          payload: subscriptions,
        });
      }, (error) => {
        return dispatch({
          type: FETCHING_APPLET_DATA_FAIL,
          payload: error,
        });
      });
  }
}
