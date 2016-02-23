import React, { PropTypes } from 'react'
import RangeMapper from '../util/range_mapper'
import RangeSelector from '../components/range_selector'
import { connect } from 'react-redux'
import OptionsSelector from '../components/options_selector'
import Immutable from 'immutable'
import Constants from '../constants'

const rangeMapper = RangeMapper(0, 127, 0, 10)

/* TODO move MIDI code */

var midiAccess;
var midiOutputPort;

if (navigator.requestMIDIAccess) {
  navigator
    .requestMIDIAccess({ sysex: true })
    .then(onMIDISuccess, onMIDIFailure)
} else {
  alert("No MIDI support in your browser.")
}

// midi functions
function onMIDISuccess(midi) {
  midiAccess = midi
  midiOutputPort = selectMidiPort()

  console.log(midiOutputPort)
}

function onMIDIFailure(error) {
  // when we get a failed response, run this code
  console.log(
    "No access to MIDI devices or your browser doesn't " +
    "support WebMIDI API. Please use WebMIDIAPIShim " +
    error
  )
}

function selectMidiPort() {
  for (var output of midiAccess.outputs.values()) {
    if (output.name == "MIDI Express XT Port 8") {
      return output
    }
  }
}

/* end MIDI */

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function extractRangeValue(event) {
  return rangeMapper.unmap(parseFloat(event.target.value))
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
      const extractedValue = valueExtractor(event)

      updateSynth({
        path: path,
        value: extractedValue
      })

      props.dispatch({
        type: 'SET_PARAM',
        path: path,
        value: extractedValue
      })
    }
  }

  const NOT_IMPLEMENTED = "nope"
  const juno106Parameters = Immutable.fromJS(
    { osc:
      { osc1:
        { lfo: 0x02,
          pwmLevel: 0x03,
          noise: 0x04,
          subOsc: 0x0f,
          waveLength: NOT_IMPLEMENTED,
          pulseWave: NOT_IMPLEMENTED,
          triangleWave: NOT_IMPLEMENTED,
          pwmType: NOT_IMPLEMENTED } },
          mod: { lfo: { rate: 0x00, delay: 0x01 } },
          filter:
            { frequency: 0x05,
              resonance: 0x06,
              envelopeAmount: 0x07,
              lfo: 0x08,
              keyboardTracking: 0x09,
              polarity: NOT_IMPLEMENTED,
              hpf: NOT_IMPLEMENTED },
              envelope: { attack: 0x0b,
                decay: 0x0c,
                sustain: 0x0d,
                release: 0x0e },
                amp: { level: 0x0a, modType: NOT_IMPLEMENTED },
                chorus: { disabled: NOT_IMPLEMENTED, level: NOT_IMPLEMENTED }
    })

  function generateParamChangeMessage({ channel, path, value }) {
    const parameter = juno106Parameters.getIn(path.split('.'))

    if (!parameter || value == NaN) {
      return null
    }

    const rolandId = 0x41
    const functionType = 0x32 // "when volume controllers or switches are changed"

    return [
      Constants.sysex.start,
      rolandId,
      functionType,
      channel,
      parameter,
      Math.round(value),
      Constants.sysex.finish
    ]
  }

  function updateSynth({ path, value }) {
    const message = generateParamChangeMessage({
      channel: 0x00, // TODO configurable
      path,
      value
    })

    if (message) {
      console.log(message)
      midiOutputPort.send(message)
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
