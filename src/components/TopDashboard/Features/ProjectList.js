import React from "react";
import { List, ListItem } from "styles";
import helper from "helpers/helper";

const ProjectList = ({ projects, setCurrentProject, deactivateSelector }) => {
  const screenWidth = helper.screenWidth();
  const buttonsLength = 549;
  const position =
    screenWidth > buttonsLength ? screenWidth - buttonsLength : 0;

  return (
    <List onMouseLeave={deactivateSelector} style={{ left: `${position}px` }}>
      {projects.length > 0 ? (
        projects.map(project => (
          <ListItem
            key={project._id}
            onClick={() => {
              setCurrentProject(project);
            }}
          >
            {project.name}
          </ListItem>
        ))
      ) : (
        <ListItem onClick={deactivateSelector}>No Current Project</ListItem>
      )}
    </List>
  );
};

export default ProjectList;
