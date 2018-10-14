import styled from "styled-components";

export const Nav = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  margin: 5px;
`;

export const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-auto-flow: column;
  grid-gap: 20px;
  align-items: center;
  margin: 10px;
`;

export const AppName = styled.div`
  font-size: 40px;
  color: ${props => props.theme.teal};
  margin-top: 10px;
`;

export const UserName = styled.div`
  margin-top: 8px;
  font-size: 28px;
  color: ${props => props.theme.teal};
`;
