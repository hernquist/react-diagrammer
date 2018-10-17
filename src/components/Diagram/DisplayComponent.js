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
  Element,
  Key
} from "styles";

import Icons from "utils/Icons";

class DisplayComponent extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    const { component, setSelected, history } = this.props;
    const { _id, name, iteration } = component;
    setSelected(_id);
    this.props.history.push(`/main/component/${name}/${iteration}`);
  };

  render() {
    const { component, parent, history } = this.props;
    const stateOutput = component.style === "container";
    const [name, iteration] = history.location.pathname.split("/").slice(3);
    const isSelected =
      name === component.name && Number(iteration) === component.iteration;
    const isParent = parent === component._id;

    // TODO, determine length of strength
    const fontSize = component.name.length > 10 ? "12px" : "20px";

    const Card = isSelected ? SelectedCard : isParent ? ParentCard : BaseCard;
    const Name = isSelected ? SelectedName : isParent ? ParentName : BaseName;

    return (
      <Card onClick={this.handleClick}>
        <Name style={{ fontSize }}>{component.name}</Name>
        {/* <div>{`STATE: ${stateOutput}`}</div> */}
        {/* <div>{`PROPS: ${component.props.length}`}</div> */}
        <Content>
          <Icons icon={component.style} />

          <Numbers>
            {stateOutput && (
              <Element>
                <div>state</div>
                <Fragment>4</Fragment>
              </Element>
            )}
            <Element>
              <div>props</div>
              <Fragment>2</Fragment>
            </Element>
            <Element>
              <div>cb's</div>
              <Fragment>0</Fragment>
            </Element>
          </Numbers>
        </Content>
      </Card>
    );
  }
}

export default DisplayComponent;
