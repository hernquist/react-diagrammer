import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { FlatButton } from "./FlatButton";
import Portal from "../../utils/Portal";
import { ModalCard, ModalWrapper, ModalBackground as Background } from "styles";

export default class Modal extends Component {
  render() {
    const { children, visible, toggle } = this.props;
    return (
      <Portal>
        {visible && (
          <ModalWrapper>
            <ModalCard>
              <CloseButton onClick={toggle}>Close</CloseButton>
              <Fragment>{children}</Fragment>
            </ModalCard>
            <Background onClick={toggle} />
          </ModalWrapper>
        )}
      </Portal>
    );
  }
}

const CloseButton = styled(FlatButton)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 5px;
  padding: 2px;
`;
