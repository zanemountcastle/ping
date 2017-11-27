import axios from 'axios';
import { apiBaseURL } from './../utils/Constants';
import {
    FETCHING_COIN_DATA,
    FETCHING_COIN_DATA_SUCCESS,
    FETCHING_COIN_DATA_FAIL,
} from './../utils/ActionTypes';
import { getFeeds } from '../lib/Fetch';

export default function FetchCoinData() {
  return dispatch => {

    dispatch({
      type: FETCHING_COIN_DATA
    })

    return getFeeds()
      .then(feeds => {
        return dispatch({
          type: FETCHING_COIN_DATA_SUCCESS,
          payload: feeds
        });
      })
      .catch(err => {
        return dispatch({
          type: FETCHING_COIN_DATA_FAIL,
          payload: err
        });
      });

  }
}
