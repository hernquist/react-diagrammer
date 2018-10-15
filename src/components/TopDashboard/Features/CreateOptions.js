import React from "react";
import { Link } from "react-router-dom";
import helper from "helpers/helper";
import { List, ListItem } from "styles";

const CreateOptions = ({ deactivateSelector }) => {
  const screenWidth = helper.screenWidth();
  const buttonsLength = 386;
  const position =
    screenWidth > buttonsLength ? screenWidth - buttonsLength : 0;

  return (
    <List onMouseLeave={deactivateSelector} style={{ left: `${position}px` }}>
      <ListItem>
        <Link to="/main/new-project" onClick={deactivateSelector}>
          PROJECT
        </Link>
      </ListItem>
      <ListItem>
        <Link
          to="/main/component/new"
          className="list-item"
          onClick={deactivateSelector}
        >
          COMPONENT
        </Link>
      </ListItem>
      <ListItem>
        <Link
          to="/main/component/add-existing"
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
