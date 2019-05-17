import React, { Component, Fragment } from "react";
import {
  BaseCard,
  SelectedCard,
  ParentCard,
  BaseName,
  SelectedName,
  ParentName,
  Content,
  Numbers,
  Element
} from "styles";
import Icons from "utils/Icons";

const showProjectHistoryDefault = {
  location: {
    pathname: "a/b/c/d/e"
  }
};

class DisplayComponent extends Component {
  handleClick = () => {
    const { component, showProject = false } = this.props;
    const { name, iteration } = component;
    !showProject &&
      this.props.history.push(`/main/component/${name}/${iteration}`);
  };

  render() {
    const {
      component,
      parent,
      history = showProjectHistoryDefault,
      x,
      y
    } = this.props;
    const stateOutput = component.style === "container";

    const [name = "", iteration = 0] = history.location.pathname
      .split("/")
      .slice(3);
    const isSelected =
      name === component.name && Number(iteration) === component.iteration;
    const isParent = parent === component._id;

    const fontSize = component.name.length > 10 ? "12px" : "20px";

    const Card = isSelected ? SelectedCard : isParent ? ParentCard : BaseCard;
    const Name = isSelected ? SelectedName : isParent ? ParentName : BaseName;
    const isUnassigned = component.placement === "unassigned";
    const cardStyles = isUnassigned
      ? null
      : {
          position: "absolute",
          left: x,
          top: y
        };

    return (
      <Card onClick={this.handleClick} style={cardStyles}>
        <Name style={{ fontSize }}>{component.name}</Name>
        <Content>
          <Icons icon={component.style} />
          <Numbers>
            {stateOutput && (
              <Element>
                <div>state</div>
                <Fragment>{component.state.length}</Fragment>
              </Element>
            )}
            <Element>
              <div>props</div>
              <Fragment>{component.props.length}</Fragment>
            </Element>
            {stateOutput && (
              <Element>
                <div>cb's</div>
                <Fragment>{component.callbacks.length}</Fragment>
              </Element>
            )}
          </Numbers>
        </Content>
      </Card>
    );
  }
}

export default DisplayComponent;
