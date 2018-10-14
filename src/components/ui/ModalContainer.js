import React, { Component, Fragment } from 'react';
import Toggle from './Toggle';
import Modal from './Modal';
import { FlatButton } from './FlatButton';

export default class ModalContainer extends Component {
  render() {
    const { children, text } = this.props;

    return (
      <Toggle>
        {({ visible, toggle }) => (
          <Fragment>
            <FlatButton onClick={toggle}>{text}</FlatButton>
            <Modal visible={visible} toggle={toggle} >
              {children}
            </Modal>
          </Fragment>
        )}
      </Toggle>
    )
  }
}
