import React, { PropTypes } from 'react'
import constants from '../constants'

class OptionsSelector extends React.Component {
  createOption({ optionName, value, checked }) {
    return (
      <label htmlFor={ this.props.name }>
      <input
        type='radio'
        key={ this.props.name + value }
        value={ value }
        onChange={ this.props.onChange }
        checked={ checked } />
        { optionName }
      </label>
    )
  }

  render () {
    return (
      <div className="options-selector">
        { this.props.name }
        { this.props.options.map(this.createOption.bind(this)) }
      </div>
    )
  }
}

OptionsSelector.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default OptionsSelector
