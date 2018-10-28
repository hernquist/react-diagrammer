import styled from 'styled-components';

export const Callback = styled.div`
  font-size: 20px; 
  height: 28px;
  width: 90%;
  max-width: 90%;
  border: 1px solid ${ props => props.theme.madison };
  background-color: ${ props => props.theme.lightGrey };
  color: ${ props => props.theme.teal };
  padding: 4px 10px;

  &:last-child {
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  &:nth-child(2) {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }

  &:hover {
    background-color: ${ props => props.theme.madison };
    color: ${ props => props.theme.lightGrey };
  }
`;

export const CallbackListContainer = styled.div`
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
