import React from "react";
import { List, ListItem } from "styles";
import { OPTIONS } from "helpers/const";

const TypeOptions = ({ deactivateSelector, handleSelect, fieldtype }) => {


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
