import React, { Fragment } from 'react';
import { Message } from 'styles';

const CallbackList = ({
  callbacks,
  highlighted,
  editCb,
  resetHighlight,
  setHighlight,
  setRenderFormTrue
}) => {
  if (callbacks.length < 1 ) { 
    return <Message>No Callbacks To Show</Message>
  }

  return (
    <Fragment>
      <Message>Click a Callback To Edit</Message>
      {callbacks.map(callback => (
        <div
          style={{ 
            fontSize: "16px", 
            margin: "4px",
            backgroundColor: highlighted._id === callback._id && 'rgba(0, 0, 0, 0.3)'
          }} 
          key={callback._id}
          onMouseEnter={() => editCb(callback)}
          onMouseLeave={resetHighlight}
          onClick={() => {
            setHighlight(callback);
            setRenderFormTrue();
          }}
        >
          {callback.name}
        </div>
      ))}
    </Fragment>
  )
}

export default CallbackList;