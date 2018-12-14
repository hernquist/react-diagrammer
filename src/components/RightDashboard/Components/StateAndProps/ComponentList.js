import React, { Component } from "react";
import {
  ComponentList as Container,
  RightDashboardTitle as Title,
  ComponentListItem as ListItem
} from "styles";

export default class ComponentList extends Component {
  render() {
    const {
      potentialParents = [],
      chooseComponent,
      highlighted,
      text,
      display
    } = this.props;
    if (!display) return null;
    console.log("we're here");

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
}
