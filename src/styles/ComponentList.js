import styled from "styled-components";

export const ComponentList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 5px;
`;

export const ComponentListTitle = styled.div`
  font-size: 24px;
  margin: 0 auto 3px;
  height: 36px;
  border: 1px solid ${props => props.theme.lightGrey};
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 6px;
  color: ${props => props.theme.grey};
  background: ${props => props.theme.madison};
`;

export const ComponentListItem = styled.div`
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
