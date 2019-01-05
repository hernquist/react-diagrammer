import styled from 'styled-components';
import { ShowUnassignedText } from './ShowUnassigned';

export const ShowComponentText = styled(ShowUnassignedText)`
  font-size: 16px;
`;

export const ShowComponentTable = styled.div`
  border: 2px solid black;
  width: 100%;
  height: 80vh;
  padding: 10px;
`;

export const ShowComponentBar = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ShowComponentTab = styled.div`
  border: 2px solid blue; 
`;