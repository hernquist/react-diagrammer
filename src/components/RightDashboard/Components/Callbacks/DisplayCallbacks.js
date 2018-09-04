import React from 'react';

const DisplayCallbacks = ({currentComponent, editCallback, resetHighlight, setHighlight }) => {
  const { callbacks } = currentComponent;
  if (callbacks.length < 1) return <h3>No Callbacks To Show</h3>
  return (
    <div>
      <h3>Click a Callback To Edit</h3>
      {callbacks.map((callback, index) => (
        <div 
          style={{ fontSize: "16px", margin: "4px" }} 
          key={callback._id}
          onMouseEnter={() => editCallback(callback)}
          onMouseLeave={resetHighlight}
          onClick={setHighlight}
        >
          {callback.name}
        </div>)
      )}
    </div>
  );
}

export default DisplayCallbacks; 


