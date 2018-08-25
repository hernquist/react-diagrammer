import React, { Component } from 'react'

export default class ChildComponents extends Component {
  state = { highlighted: '' };

  render() {
    const { childs } = this.props;
    const { highlighted } = this.state;
    return (
      <div>
        {childs.map(child => (
          <div 
            key={child._id}
            onClick={()=>this.setState({highlighted: child._id})}
            style={{ backgroundColor: highlighted === child._id && 'rgba(0, 0, 0, 0.3)'}}
          >
            {child.name}
          </div>
        )) }
      </div>
    )
  }
}
