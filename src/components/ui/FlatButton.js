import styled from 'styled-components';

// a {...} may not be necessary

export const FlatButton = styled.button`
  background: inherit;
  display: grid;
  margin: 6px;
  width: 100px;
  height: 26px;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding-top: 6px;
  border-radius: 4px;
  color: #21c2f8;
  font-size: 20px;
  border: none;
  box-shadow: none;
  
  &:hover {
    margin: 6px;
    background-color: rgba(33, 194, 248, 0.6);
    border-radius: 4px;
    box-shadow: 3px 3px rgba(33, 194, 248, 0.2);
    color: #202020;
    font-size: 20px;
  }

  a {
  display: grid;
  text-decoration: none;
  color: #21c2f8;
  font-size: 20px;
  }
`;

export const SmallFlatButton = styled(FlatButton)`
  font-size: 16px;
`