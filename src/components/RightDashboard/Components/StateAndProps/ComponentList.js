import React from "react";
import {
  ComponentList as Container,
  RightDashboardTitle as Title,
  ComponentListItem as ListItem
} from "styles";

const ComponentList = ({
  potentialParents,
  chooseComponent,
  highlighted,
  text,
  display
}) => {
  if (!display) return null;

  return (
    <Container>
      <Title>{text}</Title>
      {potentialParents.map(parent => (
        <ListItem
          key={parent._id}
          onClick={() => chooseComponent(parent._id)}
          style={{
            backgroundColor:
              highlighted === parent._id && "rgba(0, 0, 0, 0.3)"
          }}
        >
          {parent.name}
        </ListItem>
      ))}
    </Container>
  );
}

export default ComponentList;
