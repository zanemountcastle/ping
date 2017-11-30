import {
    FETCHING_APPLET_DATA,
    FETCHING_APPLET_DATA_SUCCESS,
    FETCHING_APPLET_DATA_FAIL,
} from './ActionTypes';
import { getFeeds } from '../lib/Fetch';

export default function FetchAppletData() {
  return dispatch => {

    dispatch({
      type: FETCHING_APPLET_DATA
    })

    return getFeeds()
      .then(feeds => {
        return dispatch({
          type: FETCHING_APPLET_DATA_SUCCESS,
          payload: feeds
        });
      })
      .catch(err => {
        return dispatch({
          type: FETCHING_APPLET_DATA_FAIL,
          payload: err
        });
      });

  }
}
