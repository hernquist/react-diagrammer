import React, { Component, Fragment } from "react";
import Portal from "../../utils/Portal";
import {
  ModalCard,
  LargeModalCard,
  ModalWrapper,
  ModalBackground as Background,
  CloseModalButton as CloseButton
} from "styles";

export default class Modal extends Component {
  render() {
    const { children, visible, toggle, large } = this.props;
    const Card = large ? LargeModalCard : ModalCard;
    const childrenWithToggle = React.Children.map(children, child =>
      React.cloneElement(child, { closeModal: toggle })
    );

    return (
      <Portal>
        {visible && (
          <ModalWrapper>
            <Card>
              <CloseButton onClick={toggle}>Close</CloseButton>
              <Fragment>{childrenWithToggle}</Fragment>
            </Card>
            <Background onClick={toggle} />
          </ModalWrapper>
        )}
      </Portal>
    );
  }
}
