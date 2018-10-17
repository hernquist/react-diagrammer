import styled from "styled-components";

export const ShowUnassignedContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.lightGrey};
  width: 120px;
  min-height: 120px;
  border: 1px solid ${props => props.theme.madison};
  border-radius: 4px;
  margin: 10px;
  padding: 5px;
  /* box-shadow: 2px 2px 2px 2px black; */
`;

export const ShowUnassignedNumber = styled.div`
  font-size: 40px;
  margin: 10px auto 0;
`;

export const ShowUnassignedText = styled.div`
  font-size: 20px;
  margin: 0 auto;
`;
