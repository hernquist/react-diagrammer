import styled from "styled-components";

export const DiagramMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.grey};
`;

export const Row = styled.div`
  display: "flex";
  flex-direction: "row";
`;
