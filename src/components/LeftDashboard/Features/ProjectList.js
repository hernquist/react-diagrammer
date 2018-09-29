import React from 'react';
import '../../../styles/ProjectList.css';

const ProjectList = ({projects, setCurrentProject, refetch, deactivateSelector}) => {
  const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  const buttonsLength = 787
  const position = width > buttonsLength ? width - buttonsLength : 0;

  return ( 
    <div 
      className="project-list selector" 
      onMouseLeave={deactivateSelector}
      style={{left: `${position}px`}} 
    >
      {projects.map(project => (
        <div key={project._id} className="list-item" onClick={()=>{setCurrentProject(project)}}>
          {project.name}
        </div>
      ))}
    </div>
  )
}

export default ProjectList