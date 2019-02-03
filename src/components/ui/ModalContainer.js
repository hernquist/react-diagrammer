import React, { Component, Fragment } from "react";
import Toggle from "./Toggle";
import Modal from "./Modal";
import { FlatButton } from "./FlatButton";

export default class ModalContainer extends Component {
  render() {
    const { children, text, large, button, disabled } = this.props;
    const Button = button ? button : FlatButton;

    return (
      <Toggle>
        {({ visible, toggle }) => (
          <Fragment>
            <Button text={text} onClick={toggle} disabled={disabled}>
              {text}
            </Button>
            <Modal visible={visible} toggle={toggle} large={large}>
              {children}
            </Modal>
          </Fragment>
        )}
      </Toggle>
    );
  }
}
