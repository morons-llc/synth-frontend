import React, { PropTypes } from 'react';
import constants from '../constants';

const MIDIRangeSelector = (props) => {
  return (
    <div className="range-selector">
      <label htmlFor={ props.path }>{ props.name }</label>
      <input
        type='number'
        name={ props.path }
        min={ props.minVal || 0 }
        max={ props.maxVal || 127 }
        onChange={ props.onChange }
        value={ props.value }
      />
    </div>
  )
}

MIDIRangeSelector.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,

  minVal: PropTypes.number,
  maxVal: PropTypes.number
};

export default MIDIRangeSelector;
