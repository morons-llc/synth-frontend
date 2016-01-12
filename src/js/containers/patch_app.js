import React, { PropTypes } from 'react'
import ParamSpec from '../util/param_spec'
import MIDIRangeSelector from '../components/midi_range_selector'
import { connect } from 'react-redux'

const spec = ParamSpec(0, 127, 0, 10)

const PatchApp = (props) => {
  function setParam(path) {
    return (event) => {
      props.dispatch({
        type: 'SET_PARAM',
        path: path,
        value: spec.unmap(parseInt(event.target.value, 10))
      })
    }
  }

  function rangeSelectorFor(path, name) {
    const value = props.patchState.getIn(path.split('.'))
    const displayValue = spec.map(value)

    return (
      <MIDIRangeSelector
        name={ name }
        path={ path }
        value={ displayValue }
        onChange={ setParam(path) }
      />
    )
  }

  return (
    <div className="synth-control">
      <section className="oscillator">
        <h2>DCO</h2>
        { rangeSelectorFor('osc.osc1.lfo', 'LFO') }
        { rangeSelectorFor('osc.osc1.pwmLevel', 'PWM') }
        { rangeSelectorFor('osc.osc1.subOsc', 'Sub') }
        { rangeSelectorFor('osc.osc1.noise', 'Noise') }
      </section>
      <section className="mod">
        <h2>LFO</h2>
        { rangeSelectorFor('mod.lfo.rate', 'Rate') }
        { rangeSelectorFor('mod.lfo.delay', 'Delay') }
      </section>
      <section className="filter">
        <h2>VCF</h2>
        { rangeSelectorFor('filter.frequency', 'Freq') }
        { rangeSelectorFor('filter.resonance', 'Res') }
        { rangeSelectorFor('filter.envelopeAmount', 'Env') }
        { rangeSelectorFor('filter.lfo', 'LFO') }
        { rangeSelectorFor('filter.keyboardTracking', 'KYBD') }
      </section>
      <section className="HPF">
        <h2>HPF</h2>
        { rangeSelectorFor('filter.hpf', 'Freq') }
      </section>
      <section className="envelope">
        <h2>ENV</h2>
        { rangeSelectorFor('envelope.attack', 'A') }
        { rangeSelectorFor('envelope.decay', 'D') }
        { rangeSelectorFor('envelope.sustain', 'S') }
        { rangeSelectorFor('envelope.release', 'R') }
      </section>
      <section className="vca">
        <h2>VCA</h2>
        { rangeSelectorFor('amp.level', 'Level') }
      </section>
    </div>
  )
}

function passPatchState(store) {
  return {
    patchState: store.getIn(['currentPatch', 'state'])
  }
}

export default connect(passPatchState)(PatchApp)
