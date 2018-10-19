import React, { Component } from "react";
import {
  UnassignedContainer,
  DisplayUnassignedContainer,
  ShowUnassignedText as Text,
  UnassignedList as List,
  IconContainer
} from "styles";
import DisplayComponent from "./DisplayComponent";
import Icons from "utils/Icons";

export default class ShowUnassigned extends Component {
  state = {
    showing: false,
    selectedComponent: {}
  };

  static getDerivedStateFromProps(props, state) {
    if (state && state.showing) {
      return { showing: true };
    }
    const match = props.unassigned.filter(component => {
      const [name, iteration] = props.history.location.pathname
        .split("/")
        .slice(3);
      return (
        name === component.name && Number(iteration) === component.iteration
      );
    });
    const isSelected = match.length === 1;
    return {
      showing: isSelected,
      selectedComponent: isSelected ? match[0] : {}
    };
  }

  toggleUnassigned = () => {
    const { history } = this.props;
    const { showing } = this.state;

    this.setState({ showing: !showing });
    if (showing) {
      const path = history.location.pathname
        .split("/")
        .slice(0, 3)
        .join("/");
      history.push(path);
    }
  };

  render() {
    const { unassigned = [], history, setParent } = this.props || [];
    const { showing } = this.state;
    const length = unassigned.length;
    const caret = showing ? "caret-up" : "caret-down";
    const Container = showing
      ? DisplayUnassignedContainer
      : UnassignedContainer;

    return (
      <Container style={{ fontSize: "24px" }} onClick={setParent}>
        <Text>{length} unassigned</Text>
        {showing && (
          <List>
            {unassigned.map(component => (
              <DisplayComponent
                key={component._id}
                component={component}
                history={history}
              />
            ))}
          </List>
        )}
        <IconContainer onClick={this.toggleUnassigned}>
          <Icons icon={caret} />
        </IconContainer>
      </Container>
    );
  }
}
