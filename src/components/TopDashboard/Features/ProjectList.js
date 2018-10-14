import React from "react";
import "../../../styles/Dropdowns.css";

const ProjectList = ({ projects, setCurrentProject, deactivateSelector }) => {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const buttonsLength = 562;
  const position = width > buttonsLength ? width - buttonsLength : 0;

  return (
    <div
      className="list large"
      onMouseLeave={deactivateSelector}
      style={{ left: `${position}px` }}
    >
      {projects.length > 0 ? (
        projects.map(project => (
          <div
            key={project._id}
            className="list-item"
            onClick={() => {
              setCurrentProject(project);
            }}
          >
            {project.name}
          </div>
        ))
      ) : (
        <div className="list-item" onClick={deactivateSelector}>
          No Current Project
        </div>
      )}
    </div>
  );
};

export default ProjectList;
