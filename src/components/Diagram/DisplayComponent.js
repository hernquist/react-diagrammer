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

class DisplayComponent extends Component {
  handleClick = () => {
    const { component } = this.props;
    const { name, iteration } = component;
    this.props.history.push(`/main/component/${name}/${iteration}`);
  };

  render() {
    const { component, parent, history, x, y } = this.props;
    const stateOutput = component.style === "container";
    const [name, iteration] = history.location.pathname.split("/").slice(3);
    const isSelected =
      name === component.name && Number(iteration) === component.iteration;
    const isParent = parent === component._id;

    // TODO, determine pixel length of strength
    const fontSize = component.name.length > 10 ? "12px" : "20px";

    const Card = isSelected ? SelectedCard : isParent ? ParentCard : BaseCard;
    const Name = isSelected ? SelectedName : isParent ? ParentName : BaseName;

    return (
      <Card 
        onClick={this.handleClick} 
        style={{
          position: 'absolute',
          left: x,
          top: y
        }}   
      >
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
