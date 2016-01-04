import React, { Component, PropTypes } from 'react';

export default class RangeSelector extends Component {
  render() {
    return (
      <div class="range-selector">
        <label for={this.path}>{this.name}</label>
        <input type='number' ref='input' name={this.path} />
      </div>
    )
  }
}

RangeSelector.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
