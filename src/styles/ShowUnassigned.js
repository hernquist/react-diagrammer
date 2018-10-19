import styled from "styled-components";

export const UnassignedContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.lightGrey};
  width: 150px;
  min-height: 70px;
  border: 1px solid ${props => props.theme.madison};
  border-radius: 4px;
  margin: 10px;
  padding: 5px;
  z-index: 10;

  &:hover {
    border: 2px solid ${props => props.theme.teal};
    box-shadow: 2px 2px 2px 2px ${props => props.theme.madison};
  }
`;

export const DisplayUnassignedContainer = styled(UnassignedContainer)`
  border: 2px solid ${props => props.theme.teal};
  box-shadow: 2px 2px 2px 2px ${props => props.theme.madison};

  &:hover {
    border: 2px solid ${props => props.theme.teal};
    box-shadow: 3px 3px 3px 3px ${props => props.theme.madison};
  }
`;

export const ComponentList = styled.div`
  height: 440px;
  width: 100%
  overflow-y: scroll;
`;

export const ShowUnassignedText = styled.div`
  font-size: 24px;
  margin: 0 auto;
`;

export const IconContainer = styled.button`
  width: 100%;
  background: rgb(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  margin: 4px 4px 0;
  border-radius: 4px;

  &:hover {
    background: rgb(0, 0, 0, 0.2);
  }
`;
