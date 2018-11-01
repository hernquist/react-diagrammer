import styled from "styled-components";

export const List = styled.div`
  position: relative;
  margin: 2px;
  z-index: 9;
  top: 5px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  width: 205px;
`;

export const SmallList = styled(List)`
  width: 125px;
`;

export const ListItem = styled.div`
  background-color: ${props => props.highlight ? props.theme.teal : props.theme.madison};
  color: ${props => props.theme.lightGrey};
  font-size: 20px;
  padding: 5px 2px 0 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  a {
    color: ${props => props.theme.lightGrey};
  }

  &:first-child {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  &:last-child {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  &:hover {
    background-color: ${props => props.theme.teal};
    color: ${props => props.theme.lightGrey};
  }
`;
