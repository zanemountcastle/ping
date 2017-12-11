import {
  CREATING_AN_APPLET,
  CREATING_AN_APPLET_SUCCESS,
  CREATING_AN_APPLET_FAIL,
} from './ActionTypes';

import * as firebase from 'firebase';

export default function CreateAnApplet(_appletId, _message, _color, _organization, _authKey) {
  return dispatch => {

    dispatch({
      type: CREATING_AN_APPLET,
    });

    // Quick check for valid data
    if (_appletId == '' || _color == '' || _message == '' || _organization == '') {
      dispatch({
        type: CREATING_AN_APPLET_FAIL,
        payload: error,
      });
    } else { // Data is valid, push into Firebase
      firebase.database().ref("feeds").child(_appletId).set({
        activity: false,
        authorization_key: _authKey,
        metadata: {
          message: _message,
          color: _color,
          organization: _organization,
        }
      }).then(() => {
        dispatch({
          type: CREATING_AN_APPLET_SUCCESS,
        });
      }, (error) => {
        dispatch({
          type: CREATING_AN_APPLET_FAIL,
          payload: error,
        });
      });
    }
  }
}
