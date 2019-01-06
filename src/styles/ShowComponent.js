import styled from 'styled-components';
import { ShowUnassignedText } from './ShowUnassigned';

export const ShowComponentText = styled(ShowUnassignedText)`
  font-size: 16px;
`;

export const ShowComponentContainer = styled.div`
  border: 2px solid black;
  width: 100%;
  height: 80vh;
  background: white;
`;

export const ShowComponentBar = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ShowComponentTab = styled.div`
  border-bottom: 2px solid black; 
  border-right: 2px solid black;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  font-size: 24px;
  padding-top: 10px;
  background: ${props => props.active ? props.theme.grey : props.theme.lightGrey};
  
  :last-child {
    border-right: none;
  }
`;

export const ActiveTab = styled(ShowComponentTab)`
  background: ${props => props.theme.grey};
`;

export const ShowComponentContent = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const ShowComponentField = styled.div`
  margin-left: 15px;
`