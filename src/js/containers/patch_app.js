import React, { PropTypes } from 'react';
import MIDIRangeSelector from '../components/midi_range_selector';
import { connect } from 'react-redux';

const PatchApp = (props) => {
  return (
    <section className="oscillator">
      <MIDIRangeSelector
        name="LFO Frequency"
        path="lfo"
        value={ props.patchState.lfo }
        onChange={
          (event) => {
            props.dispatch({
              type: 'SET_PARAM',
              path: 'lfo',
              value: parseInt(event.target.value, 10)
            })
          }
        }
      />
    </section>
  )
}

function passPatchState(store) {
  return {
    patchState: store.currentPatch.state
  };
}

export default connect(passPatchState)(PatchApp);
