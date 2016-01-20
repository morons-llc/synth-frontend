import React, { PropTypes } from 'react'
import RangeMapper from '../util/range_mapper'
import RangeSelector from '../components/range_selector'
import { connect } from 'react-redux'
import OptionsSelector from '../components/options_selector'

const rangeMapper = RangeMapper(0, 127, 0, 10)

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function extractRangeValue(event) {
  return rangeMapper.unmap(parseInt(event.target.value, 10))
}

function extractBooleanValue(event) {
  return event.target.value === 'true'
}

const PatchApp = (props) => {
  function valueAt(path) {
    return props.patchState.getIn(path.split('.'))
  }

  function setParam(path, valueExtractor) {
    return (event) => {
      props.dispatch({
        type: 'SET_PARAM',
        path: path,
        value: valueExtractor(event)
      })
    }
  }

  function rangeSelectorFor(path, name) {
    const value = valueAt(path)
    const displayValue = rangeMapper.map(value)

    return (
      <RangeSelector
        name={ name }
        path={ path }
        value={ displayValue }
        onChange={ setParam(path, extractRangeValue) }
      />
    )
  }

  function booleanSelectorFor(path, name, trueText = 'on', falseText = 'off') {
    const boolVal = valueAt(path)
    const options = [
      {
        optionName: trueText,
        value: true,
        checked: boolVal
      },
      {
        optionName: falseText,
        value: false,
        checked: !boolVal
      }
    ]

    return (
      <OptionsSelector
        name={ name }
        onChange={ setParam(path, extractBooleanValue) }
        options={ options }
      />
    )
  }

  function enumSelectorFor(path, name, values) {
    const options = values.map(value => {
      return {
        optionName: capitalizeFirstLetter(value),
        value: value,
        checked: valueAt(path) === value
      }
    })

    return (
      <OptionsSelector
        name={ name }
        onChange={ setParam(path, event => event.target.value) }
        options={ options }
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
        { booleanSelectorFor('osc.osc1.pulseWave', 'Pulse Wave') }
        { booleanSelectorFor('osc.osc1.triangleWave', 'Triangle Wave') }
        { enumSelectorFor('osc.osc1.pwmType', 'PWM Type', ['manual', 'lfo']) }
        { enumSelectorFor('osc.osc1.waveLength', 'Range', ["16", "8", "4"]) }
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
        { enumSelectorFor('filter.polarity', 'Polarity', ['positive', 'negative']) }
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
        { enumSelectorFor('amp.modType', 'Mod Type', ['gate', 'env']) }
      </section>

      <section className="chorus">
        <h2>Chorus</h2>
        { booleanSelectorFor('chorus.disabled', '', 'disabled', 'enabled') }
        { enumSelectorFor('chorus.level', 'Level', ['I', 'II']) }
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
