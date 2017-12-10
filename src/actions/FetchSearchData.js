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

    if (topic==""){
      return dispatch({
        type: FETCHING_SEARCH_DATA_SUCCESS,
        payload: subscriptions,
      });
    }

    firebase.database()
      .ref('/feeds')
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
