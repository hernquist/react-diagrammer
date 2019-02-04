import React, { Component, Fragment } from "react";
import Portal from "../../utils/Portal";
import {
  ModalCard,
  PopUpLeft as Card,
  LargeModalCard,
  CloseModalButton as CloseButton
} from "styles";

export default class PopUpl extends Component {
  render() {
    const { children, visible, toggle, large, mediumLeft } = this.props;
    const childrenWithToggle = React.Children.map(children, child =>
      React.cloneElement(child, { closeModal: toggle })
    );

    return (
      <Portal>
        {visible && (
          <Card>
            <CloseButton onClick={toggle}>Close</CloseButton>
            <Fragment>{childrenWithToggle}</Fragment>
          </Card>
        )}
      </Portal>
    );
  }
}
