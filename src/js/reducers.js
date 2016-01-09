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
                 waveLength: '8',
                 pulseWave: true,
                 triangleWave: true,
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
             chorus: { disabled: false, level: 0 } }
  }
})

function PatchAppReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PARAM':
      const path = ['currentPatch', 'state'].concat(action.path.split("."))
      return state.updateIn(path, () => action.value)
    default:
      return state
  }
}

export default PatchAppReducer
