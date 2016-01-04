import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class PatchApp extends Component {
  render() {
    return (
      <section class="oscillator">
        <RangeSelector name="LFO Frequency" path="osc.osc1.lfo" />
      </section>
    )
  }
}
