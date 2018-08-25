import React, { Component } from 'react'

export default class ShowUnassigned extends Component {
  render() {
    const { unassigned } = this.props || [];
    return (
      <div style={{fontSize: '24px'}}>
        {unassigned.length}
      </div>
    )
  }
}
