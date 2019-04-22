import React from "react";
import { Link } from "react-router-dom";
import helper from "helpers/helper";
import { List, ListItem } from "styles";

const CreateOptions = ({ deactivateSelector, visible }) => {
  const screenWidth = helper.screenWidth();
  const buttonsLength = 221;
  const position =
    screenWidth > buttonsLength ? screenWidth - buttonsLength : 0;
  if (!visible) return null;

  return (
    <List onMouseLeave={deactivateSelector} style={{ left: `${position}px` }}>
      <ListItem>
        <Link to="/main/new-project" onClick={deactivateSelector}>
          PROJECT
        </Link>
      </ListItem>
      <ListItem>
        <Link
          to="/main/new-component"
          className="list-item"
          onClick={deactivateSelector}
        >
          COMPONENT
        </Link>
      </ListItem>
      <ListItem>
        <Link
          to="/main/add-existing-component"
          className="list-item"
          onClick={deactivateSelector}
        >
          EXISTING COMPONENT
        </Link>
      </ListItem>
    </List>
  );
};

export default CreateOptions;
