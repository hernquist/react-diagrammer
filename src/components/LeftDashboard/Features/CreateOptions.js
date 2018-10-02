import React from 'react';
import { Link } from 'react-router-dom';


const CreateOptions = ({ deactivateSelector }) => {
  const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  const buttonsLength = 332;
  const position = width > buttonsLength ? width - buttonsLength : 0;

  return (
    <div 
      className = "list large" 
      onMouseLeave = {deactivateSelector}
      style = {{ left: `${position}px` }} 
    >
      <Link to='/main/new-project' className="list-item" onClick={deactivateSelector}>
        <div className='button-content'>PROJECT</div>
      </Link>
      <Link to='/main/component/new' className="list-item" onClick={deactivateSelector}>
        <div className='button-content'>COMPONENT</div>
      </Link>
      <Link to='/main/component/add-existing' className="list-item" onClick={deactivateSelector}>
        <div className='button-content'>EXISTING COMPONENT</div>
      </Link>
    </div>
  )
}

export default CreateOptions;