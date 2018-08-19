import React from 'react';
import '../../../styles/ProjectList.css';


const ProjectList = ({projects, setCurrentProject}) => {
  return ( 
    <div className="project-list selector">
      {projects.map(project => (
        <div key={project._id} className="list-item" onClick={()=>setCurrentProject(project)}>
          {project.name}
        </div>
      ))}
    </div>
  )
}

export default ProjectList