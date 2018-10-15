import styled from "styled-components";

export const AuthWrapper = styled.div`
  margin: 12px;
  h2 {
    color: ${props => props.theme.black};
  }
`;

export const InputField = styled.div`
  color: #202020;
  margin: 16px 0 8px 0;
  padding-bottom: 10px;
  font-size: 22px;
  display: flex;
  flex-direction: column;

  input {
    background-color: #f3f7f8;
    font-size: 22px;
    padding: 6px 6px 0 6px;
    border: 1px solid #2c3e50;
    text-decoration: none;
  }

  input: focus {
    outline: 2px offset ${props => props.theme.teal};
  }
`;
