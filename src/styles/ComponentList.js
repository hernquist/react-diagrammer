import styled from "styled-components";

export const ComponentList = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const ComponentListItem = styled.div `
  border: 1px solid black;
  border-radius: 4px;
  margin: 3px 10px;
  height: 30px;
  color: ${props => props.theme.teal};
  background: ${props => props.theme.lightGrey};
  display: flex;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  padding-top: 6px;
`;