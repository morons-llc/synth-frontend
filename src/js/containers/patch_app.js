import React, { PropTypes } from 'react'
import MIDIRangeSelector from '../components/midi_range_selector'
import { connect } from 'react-redux'

const PatchApp = (props) => {
  return (
    <div className="synth-control">
      <section className="oscillator">
        <h2>DCO</h2>
        { rangeSelectorFor('osc.osc1.lfo', 'LFO', props) }
        { rangeSelectorFor('osc.osc1.pwmLevel', 'PWM', props) }
        { rangeSelectorFor('osc.osc1.subOsc', 'Sub', props) }
        { rangeSelectorFor('osc.osc1.noise', 'Noise', props) }
      </section>
      <section className="mod">
        <h2>LFO</h2>
        { rangeSelectorFor('mod.lfo.rate', 'Rate', props) }
        { rangeSelectorFor('mod.lfo.delay', 'Delay', props) }
      </section>
      <section className="filter">
        <h2>VCF</h2>
        { rangeSelectorFor('filter.frequency', 'Freq', props) }
        { rangeSelectorFor('filter.resonance', 'Res', props) }
        { rangeSelectorFor('filter.envelopeAmount', 'Env', props) }
        { rangeSelectorFor('filter.lfo', 'LFO', props) }
        { rangeSelectorFor('filter.keyboardTracking', 'KYBD', props) }
      </section>
      <section className="HPF">
        <h2>HPF</h2>
        { rangeSelectorFor('filter.hpf', 'Freq', props) }
      </section>
      <section className="envelope">
        <h2>ENV</h2>
        { rangeSelectorFor('envelope.attack', 'A', props) }
        { rangeSelectorFor('envelope.decay', 'D', props) }
        { rangeSelectorFor('envelope.sustain', 'S', props) }
        { rangeSelectorFor('envelope.release', 'R', props) }
      </section>
      <section className="vca">
        <h2>VCA</h2>
        { rangeSelectorFor('amp.level', 'Level', props) }
      </section>
    </div>
  )
}

function setParam(path, dispatch) {
  return (event) => {
    dispatch({
      type: 'SET_PARAM',
      path: path,
      value: parseInt(event.target.value, 10)
    })
  }
}

function rangeSelectorFor(path, name, props) {
  return (
    <MIDIRangeSelector
    name={ name }
    path={ path }
    value={ props.patchState.getIn(path.split('.')) }
    onChange={ setParam(path, props.dispatch) }
    />
  )
}

function passPatchState(store) {
  return {
    patchState: store.getIn(['currentPatch', 'state'])
  }
}

export default connect(passPatchState)(PatchApp)
