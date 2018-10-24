import React from "react";
import { Link } from "react-router-dom";
import { SmallList, ListItem } from "styles";
import helper from "helpers/helper";

const DeleteOptions = ({ deactivateSelector }) => {
  const screenWidth = helper.screenWidth();
  const buttonsLength = 296;
  const position =
    screenWidth > buttonsLength ? screenWidth - buttonsLength : 0;

  return (
    <SmallList
      onMouseLeave={deactivateSelector}
      style={{ left: `${position}px` }}
    >
      <ListItem>
        <Link to="/main/delete-project" onClick={deactivateSelector}>
          PROJECT
        </Link>
      </ListItem>
      <ListItem>
        <Link
          to="/main/component/delete-component"
          onClick={deactivateSelector}
        >
          COMPONENT
        </Link>
      </ListItem>
    </SmallList>
  );
};

export default DeleteOptions;
