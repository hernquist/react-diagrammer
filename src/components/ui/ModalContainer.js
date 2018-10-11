import React, { Component, Fragment } from 'react';
import Toggle from './Toggle';
import Modal from './Modal';

export default class ModalContainer extends Component {
  render() {
    const { children, text } = this.props;

    return (
      <Toggle>
        {({ visible, toggle }) => (
          <Fragment>
            <button onClick={toggle}>{text}</button>
            <Modal visible={visible} toggle={toggle} >
              {children}
            </Modal>
          </Fragment>
        )}
      </Toggle>
    )
  }
}
