import styled from 'styled-components';

export const Callback = styled.div`
  
  font-size: 20px; 
  height: 40px;
  width: 90%;
  max-width: 90%;
  border: 1px solid ${ props => props.theme.madison };
  border-bottom: none;
  background-color: ${ props => props.theme.lightGrey };
  color: ${ props => props.theme.teal };
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 6px;

  &:last-child {
    border-bottom: 1px solid ${ props => props.theme.madison };
  }

  // &:nth-child(2) {
  //   border-top-right-radius: 5px;
  //   border-top-left-radius: 5px;
  // }

  &:hover {
    background-color: ${ props => props.theme.lightBlue };
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
