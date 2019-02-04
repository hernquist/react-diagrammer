import styled from "styled-components";

export const PopUpLeft = styled.div`
  position: absolute;
  top: 20px;
  left: 60px;
  background: ${props => props.theme.lightGrey};
  border: 2px solid black;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rbga(0, 0, 0, 0.3);
  padding: 15px;
  z-index: 100;
  min-width: 700px;
`;
