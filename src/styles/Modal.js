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
  z-index: 100;
  min-width: 320px;
  margin-bottom: 400px;
`;

export const LargeModalCard = styled.div`
  position: relative;
  background: ${props => props.theme.lightGrey};
  border-radius: 5px;
  box-shadow: 2px 2px 10px rbga(0, 0, 0, 0.3);
  padding: 15px;
  z-index: 100;
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
  background-color: ${props => props.theme.black};
  opacity: 0.5;
  z-index: 90;
`;

export const CloseModalButton = styled.button`
  width: 100px;
  height: 40px;
  border: 2px solid black;
  font-size: 14px;
  position: absolute;
  top: 8px;
  right: 8px;
  
  &:hover {
    background: ${props => props.theme.lightBlue};
  };
`;

