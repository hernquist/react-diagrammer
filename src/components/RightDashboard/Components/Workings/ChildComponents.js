import React, { Component } from 'react'

export default class ChildComponents extends Component {
  render() {
    const { childs, handleParent, highlighted } = this.props;
    return (
      <div>
        <div style={{borderBottom: '1px solid black'}}>Choose a parent</div>

        {childs.map(child => (
          <div 
            key={child._id}
            onClick={() => handleParent(child._id)}
            style={{ 
              backgroundColor: highlighted === child._id && 'rgba(0, 0, 0, 0.3)',
              border: '1px solid black',
              borderRadius: '4px',
              margin: '2px 5px',
              padding: '6px 0 0 4px'
            }}
          >
            {child.name}
          </div>
        )) }
      </div>
    )
  }
}
