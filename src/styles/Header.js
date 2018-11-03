import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

export const TitlesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const AppName = styled.div`
  font-size: 40px;
  margin-top: 10px;
  margin-right: 10px
  color: ${props => props.theme.teal};

  @media only screen and (max-width: 585px) {
    display: none;
  }
`;

export const UserNameLarge = styled.div`
  @media only screen and (min-width: 1000px) {
    font-size: 28px;
    margin: 10px 10px 0 10px; 
    color: ${props => props.theme.teal};
  }

  @media only screen and (max-width: 999px) {
    display: none;
  }
`;

export const UserNameMedium = styled.div`
  @media only screen and (max-width: 999px) {
    margin: 10px 10px 0 10px;    
    font-size: 28px;
    color: ${props => props.theme.teal};
  }
  
  @media only screen and (min-width: 1000px) {
    display: none;
  }
`;

export const HideWrapper = styled.div`
  @media only screen and (max-width: ${props => props.breakpoint}) {
    display: none;
  }
`;

export const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 2px;
`;
