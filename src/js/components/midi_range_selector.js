import React, { Component, PropTypes } from 'react';

class MIDIRangeSelector extends Component {
  render() {
    return (
      <div className="range-selector">
        <label htmlFor={this.props.path}>{this.props.name}</label>
        <input type='number' ref='input' name={this.props.path} min='0' max='127' />
      </div>
    )
  }
}

MIDIRangeSelector.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default MIDIRangeSelector;
