export default function createReducer(intitialState, handlers) {
  return function reducer(state = intitialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state,action);
    } else {
      return state;
    }
  }
}
