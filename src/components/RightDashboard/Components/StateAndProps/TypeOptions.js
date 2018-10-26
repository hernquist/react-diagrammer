import React from "react";
// import helper from "helpers/helper";
import { List, ListItem } from "styles";
import { OPTIONS } from "helpers/const";

const TypeOptions = ({ deactivateSelector, handleSelect, fieldtype }) => {
  // const screenWidth = helper.screenWidth();
  // const buttonsLength = 386;
  // const position =
  // screenWidth > buttonsLength ? screenWidth - buttonsLength : 0;

  return (
    <List onMouseLeave={deactivateSelector}>
      {OPTIONS.map(option => (
        <ListItem
          key={option.value}
          onClick={() => {
            deactivateSelector();
            handleSelect(option.value, fieldtype);
          }}
        >
          {option.value}
        </ListItem>
      ))}
    </List>
  );
};

export default TypeOptions;
