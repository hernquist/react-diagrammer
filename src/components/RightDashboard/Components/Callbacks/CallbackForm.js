import React, { Component } from 'react'

export default class CallbackForm extends Component {
  render() {
    const {
      name,
      description,
      functionArgs,
      argName,
      typeName,
      setState,
      stateField,
      stateChange,
      // highlighted,
      // onHover,
      handleChange
    } = this.props;

    return (
      <div>
        <label>
          Callback name
          <input value={name} onChange={e => handleChange(e, 'name') } />
        </label>
        <label>
          Optional Description
          <input value={description} onChange={e => handleChange(e, 'description') } />
        </label>
        <label>
          Callback Argument
          <input value={argName} onChange={e => handleChange(e, 'argName') } />
        </label>
        <label>
          Argument Type 
          <input value={typeName} onChange={e => handleChange(e, 'typeName') } />
        </label>
        <label>
          Callback name
          <input value={stateField} onChange={e => handleChange(e, 'stateField') } />
        </label>
        <label>
          Callback name
          <input value={stateChange} onChange={e => handleChange(e, 'stateChange') } />
        </label>
      </div>
    )
  }
}
