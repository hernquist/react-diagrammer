import React, { Component } from 'react'

export default class CallbackForm extends Component {
  render() {
    const {
      name,
      description,
      functionArgs,
      argName,
      typeName,
      addElement,
      setState,
      stateField,
      stateChange,
      // highlighted,
      // onHover,
      handleChange
    } = this.props;

    return (
      <div>
        <div>
          <label>
            Callback name
            <input value={name} onChange={e => handleChange(e, 'name') } />
          </label>
        </div>

        <div>
          <label>
            Optional Description
            <input value={description} onChange={e => handleChange(e, 'description') } />
          </label>
        </div>

        {functionArgs.map((arg, i) => 
          <div key={arg.argName+i}>{arg.argName} and {arg.typeName}</div>
        )}

        <div>
          <label>
            Callback Argument
            <input value={argName} onChange={e => handleChange(e, 'argName') } />
          </label>
        </div>
        
        {/* selector for types */}

        <div>
          <label>
            Argument Type 
            <input value={typeName} onChange={e => handleChange(e, 'typeName') } />
          </label>
        </div>

        <div 
          className="dashboard-button" 
          onClick={()=>addElement('functionArgs')}
        >
          <div className="button-content">SUBMIT</div>
          <div className="button-content">ARGUMENT</div>
        </div>
        

        {/* todo make a selector */}
        
        <div>
          <label>
            State Field  
            <input value={stateField} onChange={e => handleChange(e, 'stateField') } />
          </label>
        </div>
        
        {/* offer some sort of guidance */}
        <div>
          <label>
            State Change
            <input value={stateChange} onChange={e => handleChange(e, 'stateChange') } />
          </label>
        </div>

        <div 
          className="dashboard-button"
          onClick={() => addElement('setState')}
        >
          <div className="button-content">SUBMIT</div>
          <div className="button-content">STATE</div>
          <div className="button-content">CHANGE</div>
        </div>


      </div>
    )
  }
}
