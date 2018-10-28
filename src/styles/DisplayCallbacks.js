import styled from "styled-components";

export const Message = styled.h3`
  color: ${props => props.theme.madison};
  margin-bottom: 3px;
  margin-top: 5px;
`;

export const DisplayCBsButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80px;
  justify-content: space-around;
  margin-top: 5px;
`;
