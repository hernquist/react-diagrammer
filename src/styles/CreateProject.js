import styled from "styled-components";

export const CreateProjectContainer = styled.div`
  display: grid;
  background: ${props => props.theme.grey};
  grid-template-rows: auto 1fr;
  justify-items: stretch;
  padding: 0px;
  margin: 15px;
`;

export const FormTitle = styled.h2`
`;

export const CreateProjectForm = styled.form`
  input {
    height: 28px;
  }
`;

export const Textarea = styled.textarea`
  font-size: 20px;
`;
