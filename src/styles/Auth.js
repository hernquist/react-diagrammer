import styled from "styled-components";

export const AuthWrapper = styled.div`
  margin: 12px;

  h2 {
    color: ${props => props.theme.madison};
  }
`;

export const InputField = styled.div`
  color: ${props => props.theme.madison}
  margin: 16px 0 8px 0;
  padding-bottom: 10px;
  font-size: 22px;
  display: flex;
  flex-direction: column;

  input {
    background-color: ${props => props.theme.lightGrey};
    font-size: 22px;
    padding: 6px 6px 2px 6px;
    border: 1px solid ${props => props.theme.madison};
    text-decoration: none;
  }

  input: focus {
    outline: 2px offset ${props => props.theme.teal};
  }
`;

export const LabelText = styled.label`
  
`;
