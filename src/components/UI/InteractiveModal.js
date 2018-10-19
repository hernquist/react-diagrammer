import React, { Component, Fragment } from "react";
import Toggle from "./Toggle";
import SubModal from "./SubModal";
import { FlatButton } from "./FlatButton";

export default class InteractiveModal extends Component {
  render() {
    const { children, text, large, button, disabled } = this.props;
    const Button = button ? button : FlatButton;

    return (
      <Toggle>
        {({ visible, toggle }) => (
          <Fragment>
            <Button onClick={toggle} disabled={disabled}>
              {text}
            </Button>
            <SubModal visible={visible} toggle={toggle} large={large}>
              {children}
            </SubModal>
          </Fragment>
        )}
      </Toggle>
    );
  }
}
