import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Portal from '../../utils/Portal';

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
    )
  }
}

const x = 'yellow'

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  `

const ModalCard = styled.div`
  position: relative;
  background: ${x};
  border-radius: 5px;
  box-shadow: 2px 2px 10px rbga(0, 0, 0, 0.3);
  padding: 15px;
  z-index: 10;
  min-width: 320px;
  margin-bottom: 400px;
`

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 5px;
  padding: 2px;
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height 100%;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.5;
`