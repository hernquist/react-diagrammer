import React from 'react';
import { List, ListItem } from 'styles';

export const ComponentList = ({ components, setHighlight, highlighted }) => 
  <List>
    {components.map(component => 
      <ListItem 
        key={component._id}
        onClick={setHighlight(component)}
        highlight={component._id === highlighted._id}
      >
        {component.name}
      </ListItem>
    )}
  </List>

