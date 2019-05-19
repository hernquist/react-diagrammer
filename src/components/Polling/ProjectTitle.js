import React from "react";
import {
  ProjectTitleContainer as Container,
  ProjectTitle as Title
} from "styles";

const ProjectTitle = ({ title }) => (
  <Container>
    <Title>{title}</Title>
  </Container>
);

export default ProjectTitle;
