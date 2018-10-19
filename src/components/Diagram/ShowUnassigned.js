import React, { Component, Fragment } from "react";
import {
  UnassignedContainer,
  DisplayUnassignedContainer,
  ShowUnassignedNumber as Number,
  ShowUnassignedText as Text,
  ComponentList,
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
      const isSelected =
        name === component.name && iteration == component.iteration;
      return isSelected;
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
    const { unassigned = [], history } = this.props || [];
    const { showing } = this.state;
    const length = unassigned.length;
    const text = length === 1 ? `component` : `components`;
    const caret = showing ? "caret-up" : "caret-down";
    const Container = showing
      ? DisplayUnassignedContainer
      : UnassignedContainer;

    return (
      <Container style={{ fontSize: "24px" }}>
        <Number>{length}</Number>
        {showing ? (
          <ComponentList>
            {unassigned.map(component => (
              <DisplayComponent
                key={component._id}
                component={component}
                history={history}
              />
            ))}
          </ComponentList>
        ) : (
          <Fragment>
            <Text>unassigned</Text>
            <Text>{text}</Text>
          </Fragment>
        )}
        {/* convert Icons to renderProps */}
        <IconContainer onClick={this.toggleUnassigned}>
          <Icons icon={caret} />
        </IconContainer>
      </Container>
    );
  }
}
