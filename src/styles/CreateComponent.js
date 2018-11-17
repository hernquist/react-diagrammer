import styled from "styled-components";

export const Input = styled.input `
    background: yellow;
    color: green;
`;

export const Selections = styled.div`
`;

export const Selection = styled.div`
  background-color: ${props => props.theme.lightGrey};
  color: ${props => props.theme.madison};
  font-size: 20px;
  padding: 5px 2px 0 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  &:hover {
    background-color: ${props => props.theme.teal};
    color: ${props => props.theme.lightGrey};
  }
`;

export const CreateComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
`

