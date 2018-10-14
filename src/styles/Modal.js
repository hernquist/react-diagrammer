import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalCard = styled.div`
  position: relative;
  background: ${props => props.theme.lightGrey};
  border-radius: 5px;
  box-shadow: 2px 2px 10px rbga(0, 0, 0, 0.3);
  padding: 15px;
  z-index: 10;
  min-width: 320px;
  margin-bottom: 400px;
`;

export const LargeModalCard = styled.div`
  position: relative;
  background: ${props => props.theme.lightGrey};
  border-radius: 5px;
  box-shadow: 2px 2px 10px rbga(0, 0, 0, 0.3);
  padding: 15px;
  z-index: 10;
  min-width: 800px;
  min-height: 600px;
  margin: 100px;
`;

export const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.5;
`;

export const CloseModalButton = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  background: inherit;
  margin: 2px;
  width: 100px;
  height: 30px;
  justify-content: center;
  border-radius: 4px;
  padding: 0;
  color: ${props => props.theme.lightGrey};
  font-size: 20px;
  background: ${props => props.theme.teal}
  border: 2px solid ${props => props.theme.madison};
  box-shadow: none;
`;
