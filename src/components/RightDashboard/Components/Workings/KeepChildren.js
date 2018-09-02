import React from 'react'

const KeepChildren = ({ hasChildren, display, keepChildren, setKeepChildren }) => {
  if (!display) return null
  if (hasChildren) return (
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
  )
  return <div>No children</div>
}

export default KeepChildren
