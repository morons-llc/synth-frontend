import { combineReducers } from 'redux'

const initialState = {
  currentPatch: {
    name: 'RolandJuno106',
    state: {
      lfo: 0
    }
  }
}

function PatchAppReducer(state = initialState, action) {
  switch (action.type) {
  case 'SET_PARAM':
    return Object.assign({}, state, {
      currentPatch: {
        state: {
          [action.path]: action.value
        }
      }
    })
  default:
    return state
  }
}

export default PatchAppReducer
