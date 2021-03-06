import styled from "styled-components";
import React from "react";

const Container = styled.div`
  display: flex;
  background: ${props => props.theme.lightBlue};
  flex-direction: column;
  padding: 0px;
  margin: 15px;
`;

export const FormTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0;
  color: ${props => props.theme.madison};
`;

export const CreateProjectForm = styled.form`
  input {
    height: 28px;
  }
`;

export const Textarea = styled.textarea`
  font-size: 20px;
`;

export const CreateProjectContainer = props => {
  const { visible = true } = props;
  if (!visible) return null;

  return <Container {...props} />;
};
