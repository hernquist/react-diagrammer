import React, { Component } from 'react';

class DisplayFields extends Component {
  render() {
    const { 
      currentComponent, 
      editField, 
      resetHighlight,
      setHighlight,
      type 
    } = this.props;
    
    const fields = type === "state" ? currentComponent.state : currentComponent.props;
    const fieldtype = type === 'state' ? 'statetype' : 'proptype'; 

    return (
      <div>
        <h3>Existing props</h3>

        {fields.map((field, index) => (
          <div 
            style={{ fontSize: "16px", margin: "4px" }} 
            key={field._id}
            onMouseEnter={() => editField(field)}
            onMouseLeave={resetHighlight}
            onClick={setHighlight}
          >
            {`${field.name}: ${field[fieldtype]}`}
          </div>)
        )}
      </div>
    );
  }
}

export default DisplayFields; 


