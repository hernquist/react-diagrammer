import styled from "styled-components";

// a {...} may not be necessary
export const FlatButton = styled.button`
  background: inherit;
  /* display: grid; */
  margin: 0;
  width: 100px;
  height: 26px;
  justify-content: center;
  /* align-content: center; */
  /* align-items: center; */
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

  a {
    text-decoration: none;
    color: ${prop => prop.theme.teal};
    font-size: 20px;
  }
`;

export const SmallFlatButton = styled(FlatButton)`
  font-size: 16px;
`;
