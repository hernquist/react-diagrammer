import styled from "styled-components";

export const RightDashboardTitle = styled.div`
  font-size: 24px;
  margin-bottom: 3px;
  height: 36px;
  border: 1px solid ${props => props.theme.lightGrey};
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 6px;
  color: ${props => props.theme.grey};
  background: ${props => props.theme.madison};
`;

export const AccordionTitle = styled(RightDashboardTitle)`
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;

export const AccordionText = styled.div`
  padding: 0 10px;
`;

export const Label = styled.div`
  font-size: 10px;
  margin: 2px 3px;
  align-self: center;
  width: 277px;

  input {
    height: 32px;
    width: 277px;
    font-size: 24px;
    background: ${props => props.theme.lightGrey};
    padding-left: 8px;
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

export const ButtonContainer = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

export const RightDashboardList = styled.div`
  position: relative;
  margin: 2px 10px 2px 2px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const RightDashboardListItem = styled.div`
  background-color: white;
  color: ${props => props.theme.black};
  font-size: 20px;
  padding: 5px 4px 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 278px;
  border: 1px solid black;

  a {
    color: ${props => props.theme.lightGrey};
  }

  &:hover {
    background-color: ${props => props.theme.lightBlue};
    color: ${props => props.theme.lightGrey};
  }

  &.selected {
    background-color: ${props => props.theme.teal};
    color: white;
  }
`;
