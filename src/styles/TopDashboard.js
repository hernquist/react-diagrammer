import styled from "styled-components";

export const TopDashboardContainer = styled.div`
  display: flex;
  height: 30px;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 12px;
`;

export const CurrentProjectTitle = styled.div`
  color: ${props => props.theme.teal};
  padding: 3px 5px 3px 11px;
  font-size: 24px;
  height: 30px;
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
