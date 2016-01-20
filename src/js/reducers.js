import { combineReducers } from 'redux'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  currentPatch: {
    synthName: 'RolandJuno106',
    state: { osc:
             { osc1:
               { lfo: 0,
                 pwmLevel: 0,
                 noise: 0,
                 subOsc: 0,
                 waveLength: '16',
                 pulseWave: true,
                 triangleWave: false,
                 pwmType: 'manual' } },
             mod: { lfo: { rate: 0, delay: 0 } },
             filter:
             { frequency: 0,
               resonance: 0,
               envelopeAmount: 0,
               lfo: 0,
               keyboardTracking: 0,
               polarity: 'positive',
               hpf: 0 },
             envelope: { attack: 0,
                         decay: 0,
                         sustain: 0,
                         release: 0 },
             amp: { level: 0, modType: 'gate' },
             chorus: { disabled: true, level: 'I' } }
  }
})

function setParam(state, paramSpec) {
  const path = ['currentPatch', 'state'].concat(paramSpec.path.split("."))
  return state.updateIn(path, () => paramSpec.value)
}

function PatchAppReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PARAM':
      return setParam(state, action)
    case 'SET_PARAMS':
      return action.params.reduce(setParam, state)
    default:
      return state
  }
}

export default PatchAppReducer
