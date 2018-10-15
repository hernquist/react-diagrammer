import React, { Component, Fragment } from "react";
import Toggle from "./Toggle";
import Modal from "./Modal";
import { FlatButton } from "./FlatButton";

export default class ModalContainer extends Component {
  render() {
    const { children, text, large } = this.props;

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
