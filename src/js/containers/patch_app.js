import React, { PropTypes } from 'react'
import MIDIRangeSelector from '../components/midi_range_selector'
import { connect } from 'react-redux'
import jsxon from 'jsxon'

const PatchApp = (props) => {
  return jsxon({
    el: 'section',
    children: [
      MIDIRangeSelector({
        name: 'LFO Frequency',
        path: 'osc.osc1.lfo',
        value: props.patchState.getIn(['osc', 'osc1', 'lfo']),
        onChange: (event) => {
          props.dispatch({
            type: 'SET_PARAM',
            path: 'osc.osc1.lfo',
            value: parseInt(event.target.value, 10)
          })
        }
      })
    ]
  })
}

function passPatchState(store) {
  return {
    patchState: store.getIn(['currentPatch', 'state'])
  }
}

export default connect(passPatchState)(PatchApp)
