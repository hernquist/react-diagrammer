import styled from "styled-components";

export const FlatButton = styled.button`
  background: inherit;
  margin: 0;
  width: 100px;
  height: 26px;
  justify-content: center;
  padding: 0;
  border-radius: 4px;
  color: ${prop => prop.theme.teal};
  font-size: 20px;
  border: none;
  box-shadow: none;

  &:hover {
    padding: 0;
    margin: 0;
    background-color: rgba(33, 194, 248, 0.6);
    border-radius: 4px;
    box-shadow: 3px 3px rgba(33, 194, 248, 0.2);
    color: ${prop => prop.theme.black};
    font-size: 20px;
    a {
      color: ${prop => prop.theme.black};
    }
  }

  &:hover,
  &:active,
  &:focus {
    outline: none !important;
  }

  a {
    text-decoration: none;
    color: ${prop => prop.theme.teal};
    font-size: 20px;
  }
`;

export const SmallFlatButton = styled.button`
  color: ${props => props.theme.teal};
  text-align: center;
  background: transparent;
  border-radius: 4px;
  font-size: 18px;
  margin-right: 10px;
  height: 22px;
  border: none;

  &:hover {
    background-color: rgba(33, 194, 248, 0.6);
    border-radius: 4px;
    box-shadow: 2px 2px rgba(33, 194, 248, 0.2);
    color: ${props => props.theme.black};
  }

  &:hover,
  &:active,
  &:focus {
    outline: none !important;
  }
`;
