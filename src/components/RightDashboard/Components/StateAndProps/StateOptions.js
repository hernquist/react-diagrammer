import React from "react";
import {
  RightDashboardList as List,
  RightDashboardListItem as ListItem
} from "styles";

const StateOptions = ({ handleSelect, fieldtype, selected, states }) => (
  <List>
    {states.map(option => (
      <ListItem
        key={option._id}
        className={selected === option.name && "selected"}
        onClick={() => handleSelect(option.name, fieldtype)}
      >
        {option.name}
      </ListItem>
    ))}
  </List>
);

export default StateOptions;
