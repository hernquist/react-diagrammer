import styled, { injectGlobal } from "styled-components";

export const theme = {
  //  '#202020'
  // '#2c3e50'
  // '#21c2f8'
  // '#bdc3c7'
  // '#f3f7f8'
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
};

export const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

injectGlobal`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-family: 'Tajawal', sans-serif;
  }
  a {
    text-decoration: none;
  }
`;
