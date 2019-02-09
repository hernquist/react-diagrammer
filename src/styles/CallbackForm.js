import styled from 'styled-components';

export const CallbackFormContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

export const FunctionArgContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; 
  align-items: center; 
  flex-direction: column;
  padding-bottom: 10px;

  &:first-child {
    margin-top: 2px;
  }

  &:last-child {
    margin-bottom: 10px;
  }
`;

export const CallbackDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; 

  font-size: 20px; 
  height: 28px;
  width: 95%;
  max-width: 95%;
  border: 1px solid ${ props => props.theme.madison };
  background-color: ${ props => props.theme.lightGrey };
  color: ${ props => props.theme.black };
  padding: 4px 10px;
  margin-left: 15px;
  margin-right: 15px;
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

  &:hover {
    background-color: ${ props => props.theme.lightBlue}
    color: ${ props => props.theme.madison };
    border: 1px solid ${ props => props.theme.black};
  }
`;



