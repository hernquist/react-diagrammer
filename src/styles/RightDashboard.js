import styled from "styled-components";

export const RightDashboardTitle = styled.div`
  font-size: 24px;
  margin: 0 auto 3px;
  height: 36px;
  border: 1px solid ${props => props.theme.lightGrey};
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 6px;
  color: ${props => props.theme.grey};
  background: ${props => props.theme.madison};
`;

export const Label = styled.div`
  font-size: 10px;
  margin: 2px 3px;
  align-self: center;
  width: 95%;

  input {
    height: 32px;
    width: 100%;
    font-size: 24px;
    background: ${props => props.theme.lightGrey};
    margin: 0;
    padding-top: 3px;
    color: ${props => props.theme.madison};

    div {
      height: 20px;
    }
  }
`;

export const LabelText = styled.div`
  padding-left: 10px;
`;
