import { combineReducers } from 'redux';

function rootReducer(state = {}, action) {
  console.log('state:', state, 'action', action);
  return state;
}

const patchApp = combineReducers({
  rootReducer
});

export default patchApp;
