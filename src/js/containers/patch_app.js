import React, { Component, PropTypes } from 'react';
import MIDIRangeSelector from '../components/midi_range_selector';
import { connect } from 'react-redux';

export default class PatchApp extends Component {
  render() {
    return (
      <section className="oscillator">
        <MIDIRangeSelector name="LFO Frequency" path="osc.osc1.lfo" />
      </section>
    )
  }
}
