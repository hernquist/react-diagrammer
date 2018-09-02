import React from 'react'

export default ({ keepChildren, setKeepChildren, hasChildren }) => {
  return (
    <div>
    {hasChildren ? 
      <div>
        <div>
          Keep the component children?
          {keepChildren ? `YES` : `NO`}
          <div
            className="dashboard-button"
            onClick={() => setKeepChildren(true)}
          >
            YES
          </div>
          <div
            className="dashboard-button"
            onClick={() => setKeepChildren(false)}
          >
            NO
          </div>
        </div>
      </div> 
     : <div> No children </div>
    }
     </div>
  )
}
