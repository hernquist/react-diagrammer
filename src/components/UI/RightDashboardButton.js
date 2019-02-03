import styled from "styled-components";

export const RightDashboardButton = styled.button`
  margin: 2px;
  width: 100px;
  height: 30px;
  justify-content: center;
  border-radius: 4px;
  padding: 0;
  color: ${props => props.theme.black};
  font-size: 18px;
  background: ${props => props.theme.white};
  border: none;
  
  width: 100px;
  height: 40px;
  border: 2px solid black;
  
  position: relative;
  width: 90%;
  max-width: 250px;
  margin: 3% 5% 2% 5%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:hover,
  &:active,
  &:focus {
      outline: none !important;
      background: ${props => props.theme.lightBlue};
      box-shadow: ${props => props.theme.bs1};
  }

  &:disabled {
    background: ${props => props.theme.grey};
    color: rgba(0, 0, 0, 0.7);
    box-shadow: none;
  }
`;


