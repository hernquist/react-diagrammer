import React from "react";
import { OPTIONS } from "helpers/const";
import { RightDashboardList as List, RightDashboardListItem as ListItem } from "styles";

const TypeOptions = ({ handleSelect, fieldtype, selected }) => (
  <List>
    {OPTIONS.map(option => (
      <ListItem
        key={option.value}
        className={selected === option.value && "selected"}
        onClick={() => handleSelect(option.value, fieldtype)}
      >
        {option.value}
      </ListItem>
    ))}
  </List>
);

export default TypeOptions;
