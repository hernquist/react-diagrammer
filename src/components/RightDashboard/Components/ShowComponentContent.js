import React from 'react'

const getStyles = ({highlighted, order}) => ({
  order, 
  background: highlighted ? 'lightblue': 'lightgrey'
})

export const ShowState = props => 
  <div style={getStyles(props)}>
    State
    {props.state.map(obj => <div key={obj.name + obj.statetype}>{obj.name}: {obj.statetype}</div>)}
  </div>

export const ShowProps = props => 
  <div style={getStyles(props)}>
    Props
    {props.props.map(obj => <div key={obj.name +obj.proptype}>{obj.name}: {obj.proptype}</div>)}
  </div>

export const ShowCallbacks = props => 
  <div style={getStyles(props)}>
    Callbacks
    {props.callbacks.map(obj => <div key={obj.name + obj.statetype}>{obj.name}: {obj.statetype}</div>)}
  </div>
  
