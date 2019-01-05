import React from 'react'

export const ShowState = ({ visible, state }) => {
  if (!visible) return null;

  return (
    <div>
      State
      {state.map(obj => <div key={obj.name + obj.statetype}>{obj.name}: {obj.statetype}</div>)}
    </div>
  )
}

export const ShowProps = ({ visible, props }) => {
  if (!visible) return null;

  return (
    <div>
      Props
      {props.map(obj => <div key={obj.name +obj.proptype}>{obj.name}: {obj.proptype}</div>)}
    </div>
  )
}

export const ShowCallbacks = ({ visible, callbacks }) => {
  if (!visible) return null;
  
  return (
    <div>
      Callbacks
      {callbacks.map(obj => <div key={obj.name + obj.statetype}>{obj.name}: {obj.statetype}</div>)}
    </div>
  )
}
