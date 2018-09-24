import React from 'react';

const DisplayCallbacks = ({
  currentComponent, 
  editCallback, 
  resetHighlight, 
  setHighlight, 
  toggleForm,
  highlighted = { _id: null}
}) => {
  const { callbacks } = currentComponent;
  if (callbacks.length < 1) return <h3>No Callbacks To Show</h3>
  return (
    <div>
      <h3>Click a Callback To Edit</h3>
      {callbacks.map((callback, index) => (
        <div
          style={{ 
            fontSize: "16px", 
            margin: "4px",
            backgroundColor: highlighted._id === callback._id && 'rgba(0, 0, 0, 0.3)'
          }} 
          key={callback._id}
          onMouseEnter={() => editCallback(callback)}
          onMouseLeave={resetHighlight}
          onClick={() => setHighlight(callback)}
        >
          {callback.name}
        </div>)
      )}
      <div
        className="dashboard-button hideable add-new-callback"
        onClick={toggleForm}
      >
        <div className="button-content">ADD</div>
        <div className="button-content">NEW</div>
        <div className="button-content">CALLBACK</div>
      </div>

      {/* first make callback form more dynamic */}

    {/* wrap this in delete and updateComponent mutations 

    use callBackFrom passing it the highlight callback and the callback functions necessary for the form

    add delete callback button
    
    */}


      
    </div>
  );
}

export default DisplayCallbacks; 


