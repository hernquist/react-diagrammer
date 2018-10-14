import styled from "styled-components";
import { SubmitButton } from "../components/UI/SubmitButton";

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

export const CloseModalButton = styled(SubmitButton)`
  position: absolute;
  top: 3px;
  right: 3px;
`;
