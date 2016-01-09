import React, { PropTypes } from 'react'
import constants from '../constants'

const MIDIRangeSelector = (props) => {
  return {
    el: 'div',
    key: `container for ${props.name}`,
    children: [
      {
        el: 'label',
        htmlFor: props.path,
        key: `label for ${props.name}`,
        text: props.name
      },
      {
        el: 'input',
        key: `input for ${props.name}`,
        type: 'number',
        name: props.path,
        min: props.minVal || 0,
        max: props.maxVal || 127,
        onChange: props.onChange,
        value: props.value
      }
    ]
  }
}

MIDIRangeSelector.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,

  minVal: PropTypes.number,
  maxVal: PropTypes.number
}

export default MIDIRangeSelector
