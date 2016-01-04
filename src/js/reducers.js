import { combineReducers } from 'redux';

function rootReducer(state = {}, action) {
  console.log('state:', state, 'action', action);
  return state;
}

const patchAppReducer = combineReducers({
  rootReducer
});

export default patchAppReducer;
