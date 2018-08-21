import React, { Component } from 'react';

class DisplayProps extends Component {
  render() {
    const { 
      currentComponent, 
      editProp, 
      resetHighlight,
      setHighlight 
    } = this.props;

    return (
      <div>
        <h3>Existing props</h3>

        {currentComponent.props.map((prop, index) =>
          (<div 
            style={{ fontSize: "16px", margin: "4px" }} 
            key={prop._id}
            onMouseEnter={() => editProp(prop)}
            onMouseLeave={resetHighlight}
            onClick={setHighlight}
            >
            {`${prop.name}: ${prop.proptype}`}
          </div>)
        )}
      </div>
    );
  }
}

export default DisplayProps; 


