import styled from 'styled-components';

export const CallbackFormContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CallbackDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; 

  font-size: 20px; 
  height: 28px;
  width: 90%;
  max-width: 90%;
  border: 1px solid ${ props => props.theme.madison };
  background-color: ${ props => props.theme.lightGrey };
  color: ${ props => props.theme.teal };
  padding: 4px 10px;

  &:hover {
    background-color: ${ props => props.theme.madison };
    color: ${ props => props.theme.lightGrey };
  }
`;

export const CallbackDetailText = styled.div`
  flex: 5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Delete = styled.div`
  flex: 1;
  text-align: center;
  background-color: ${props => props.theme.lightGrey};
  color: ${props => props.theme.madison};
  border-radius: 5px;
`;



