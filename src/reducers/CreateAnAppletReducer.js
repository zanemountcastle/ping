import {
  CREATING_AN_APPLET,
  CREATING_AN_APPLET_SUCCESS,
  CREATING_AN_APPLET_FAIL,
} from './../actions/ActionTypes';

const initialState = {
  isFetching: null,
  hasError: false,
  errorMessage: null,
  successful: false,
};

export default function(state = initialState, action) {

  switch (action.type) {

    // We don't null out data here for smooth pull-to-refresh interaction
    case CREATING_AN_APPLET:
      return Object.assign({}, state, {
        isFetching: true,
        hasError: false,
        errorMessage: null
      });

    case CREATING_AN_APPLET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        hasError: false,
        errorMessage: null,
        successful: true,
      });

    case CREATING_AN_APPLET_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        hasError: true,
        errorMessage: action.error,
        successful: false,
      });

    default:
      return state;
  }

}
