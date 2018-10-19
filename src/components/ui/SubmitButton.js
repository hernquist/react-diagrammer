import styled from "styled-components";

export const SubmitButton = styled.button`
  background: inherit;
  margin: 2px;
  width: 100px;
  height: 30px;
  justify-content: center;
  border-radius: 4px;
  padding: 0;
  color: ${props => props.theme.lightGrey};
  font-size: 20px;
  background: ${props => props.theme.teal};
  border: none;
  box-shadow: ${props => props.theme.bs1};

  &:hover,
  &:active,
  &:focus {
    outline: none !important;
  }

  &:disabled {
    background: rgba(0, 0, 0, 0.7);
    color: ${props => props.theme.grey};
  }
`;

export const WideButton = styled(SubmitButton)`
  min-height: 30px;
  width: 300px;
`;
