import React, { Component, Fragment } from "react";
import Portal from "../../utils/Portal";
import { PopUpLeft as Card, CloseModalButton as CloseButton } from "styles";
import helper from "helpers/helper";

export default class PopUpl extends Component {
  render() {
    const { children, visible, toggle } = this.props;
    const childrenWithToggle = React.Children.map(children, child =>
      React.cloneElement(child, { closeModal: toggle })
    );

    const screenWidth = helper.screenWidth();
    const leftStyle = { left: `${(screenWidth - 1000) / 2}px` };

    return (
      <Portal>
        {visible && (
          <Card style={leftStyle}>
            <CloseButton onClick={toggle}>Close</CloseButton>
            <Fragment>{childrenWithToggle}</Fragment>
          </Card>
        )}
      </Portal>
    );
  }
}
