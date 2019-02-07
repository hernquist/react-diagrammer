import React from 'react';
import { 
  Message, 
  Callback,
  CallbackListContainer as Container 
} from 'styles';

const CallbackList = ({
  callbacks,
  editCb,
  resetHighlight,
  setHighlight,
  setRenderFormTrue
}) => {
  if (callbacks.length < 1 ) { 
    return <Message>No Callbacks To Show</Message>
  }

  return (
    <Container style={{ paddingTop: "16px" }} >
      <Message style={{ paddingBottom: "6px" }}>Click a Callback To Edit</Message>
      {callbacks.map(callback => (
        <Callback 
          key={callback._id}
          onMouseEnter={() => editCb(callback)}
          onMouseLeave={resetHighlight}
          onClick={() => {
            setHighlight(callback);
            setRenderFormTrue();
          }}
        >
          {callback.name}
        </Callback>
      ))}
    </Container>
  )
}

export default CallbackList;