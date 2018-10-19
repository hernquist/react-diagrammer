import React, { Component, Fragment } from "react";
import Toggle from "./Toggle";
import Modal from "./Modal";
import { FlatButton } from "./FlatButton";

export default class ModalContainer extends Component {
  render() {
    const { children, text, large, buttonType } = this.props;
    const RenderedButton = buttonType ? buttonType : FlatButton;
    const x = children;

    return (
      <Toggle>
        {({ visible, toggle }) => (
          <Fragment>
            <FlatButton onClick={toggle}>{text}</FlatButton>
            <Modal visible={visible} toggle={toggle} large={large}>
              {children}
            </Modal>
          </Fragment>
        )}
      </Toggle>
    );
  }
}
