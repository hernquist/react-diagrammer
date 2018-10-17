import styled from "styled-components";

export const BaseCard = styled.div`
  height: 100px;
  width: 110px;
  background: ${props => props.theme.teal};
  border: double ${props => props.theme.madison} 3px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
`;

export const SelectedCard = styled(BaseCard)`
  background: ${props => props.theme.grey};
  border: 5px double ${props => props.theme.madison};
  color: ${props => props.theme.madison};
`;

export const ParentCard = styled(BaseCard)`
  background: rgba(0, 0, 0, 0.5);
`;

export const BaseName = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 5px;
  font-size: 20px;
  font-weight: 600;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px dotted ${props => props.theme.madison};
  background-color: rgba(0, 0, 0, 0.2);
`;

export const SelectedName = styled(BaseName)`
  background-color: rgba(33, 194, 248, 0.5);
  padding-top: 3px;
`;

export const ParentName = styled(BaseName)``;

export const Content = styled.div`
  width: 110px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 12px;
  padding-top: 2px;
`;

export const Numbers = styled.div`
  width: 110px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Element = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35px;

  div {
    border-bottom: 1px solid ${props => props.theme.madison};
    margin-bottom: 2px;
  }
`;
