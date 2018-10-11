import React, { Component, Fragment } from 'react';
import Toggle from './Toggle';
import Modal from './Modal';

export default class ModalContainer extends Component {
  render() {

    return (
      <Toggle>
        {({ visible, toggle }) => (
          <Fragment>
            <button onClick={toggle}>{this.props.text}</button>
            <Modal visible={visible} toggle={toggle} >
              {this.props.children}
            </Modal>
          </Fragment>
        )}
      </Toggle>
    )
  }
}
