import styled from "styled-components";
import {} from "./ComponentList";

export const Field = styled.div`
  border: 1px solid black;
  border-radius: 1px;
  margin: 3px;
  height: 32px;

  font-size: 20px !important;
  width: 277px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 6px 8px 0 8px;
  color: ${props => props.theme.black};
  background: ${props => props.theme.lightGrey};
  box-shadow: ${props => props.theme.bs1};

  &:hover {
    color: ${props => props.theme.white};
    background: ${props => props.theme.lightBlue};
  }
`;

export const ComponentWorkingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;
