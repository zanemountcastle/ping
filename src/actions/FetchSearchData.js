import {
  FETCHING_SEARCH_DATA,
  FETCHING_SEARCH_DATA_SUCCESS,
  FETCHING_SEARCH_DATA_FAIL,
} from './ActionTypes';

import * as firebase from 'firebase';

export default function FetchSearchData(topic) {
  return dispatch => {

    dispatch({
      type: FETCHING_SEARCH_DATA
    });

    let subscriptions = {};

    firebase.database()
      .ref('/discovery')
      .once('value')
      .then( (snapshot) => {
          let reads = [];

          snapshot.forEach((feed) => {
             const feedID = feed.key;
             console.log(feedID);
             if (feedID.indexOf(topic.toLowerCase()) > -1) {
               const promise = firebase.database().ref(`/feeds/${feedID}/metadata`)
                 .once('value')
                 .then((applet_snapshot) => {
                   // Add each applet's data to a `subscriptions` object
                   subscriptions[feedID] = applet_snapshot.val();
                 }, (error) => console.log("ERROR:", error));
                reads.push(promise);
             }
          });

          // Finally execute all Firebase request promises, and then return
          return Promise.all(reads); // THIS IS WITCHCRAFT
        }).then(()=> {
          return dispatch({
            type: FETCHING_SEARCH_DATA_SUCCESS,
            payload: subscriptions,
          });
        }, (error) => {
          return dispatch({
            type: FETCHING_SEARCH_DATA_FAIL,
            payload: error,
          });
        });
    }
  }




/*    return firebase.database().ref('/discovery').
    //'/feeds').startAt(topic).endAt(topic+"\uf8ff")
    //return firebase.databaseReference.orderByChild('_searchLastName').startAt(topic)
      .on('value', (snapshot) => {
        // gets around Redux panicking about actions in reducers
        setTimeout(() => {
          const searchApplets = snapshot.val() || {};
          // const discoveryApplets = snapshot.val || [];
          return dispatch({
            type: FETCHING_SEARCH_DATA_SUCCESS,
            payload: searchApplets,
          });
        }, 0);
      }, error => {
        return dispatch({
          type: FETCHING_SEARCH_DATA_FAIL,
          payload: error,
        })
      });
  }
}
*/
