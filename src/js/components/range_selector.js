import React, { PropTypes } from 'react'
import constants from '../constants'

class RangeSelector extends React.Component {
  render() {
    return (
      <div className="range-selector">
        <label htmlFor={ this.props.path }>{ this.props.name }</label>
        <input
          type='number'
          name={ this.props.path }
          min={ this.props.minVal || 0 }
          max={ this.props.maxVal || 127 }
          onChange={ this.props.onChange }
          step='0.1'
          value={ this.props.value }
        />
      </div>
    )
  }
}

RangeSelector.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,

  minVal: PropTypes.number,
  maxVal: PropTypes.number
}

export default RangeSelector
