import React, { PropTypes } from 'react'
import constants from '../constants'

const OptionsSelector = (props) => {
  function createOption({ optionName, value, checked }) {
    return (
      <label htmlFor={ props.name }>
        <input
          type='radio'
          key={ props.name + value }
          value={ value }
          onChange={ props.onChange }
          checked={ checked } />
        { optionName }
      </label>
    )
  }

  return (
    <div className="options-selector">
      { props.name }
      { props.options.map(createOption) }
    </div>
  )
}

OptionsSelector.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default OptionsSelector
