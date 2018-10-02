import React from 'react';
import { Link } from 'react-router-dom';


const DeleteOptions = ({ deactivateSelector }) => {
  const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  const buttonsLength = 242;
  const position = width > buttonsLength ? width - buttonsLength : 0;

  return (
    <div
      className="list small"
      onMouseLeave={deactivateSelector}
      style={{ left: `${position}px` }}
    >
      <Link to='/main/delete-project' className='list-item' onClick={deactivateSelector}>
        <div className='button-content'>PROJECT</div>
      </Link>
      <Link to='/main/component/delete-component' className="list-item" onClick={deactivateSelector}>
        <div className='button-content'>COMPONENT</div>
      </Link>
    </div>
  )
}

export default DeleteOptions;
