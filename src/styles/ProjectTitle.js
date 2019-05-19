import styled from "styled-components";

export const ProjectTitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ProjectTitle = styled.div`
  margin-top: 8px;
  margin-left: 10px;
  font-size: 28px;
  padding-top: 8px;
  display: flex;
  font-color: ${props => props.theme.black};
  justify-content: center;
  width: 200px;
`;
