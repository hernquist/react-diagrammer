import styled, { injectGlobal } from "styled-components";

export const theme = {
  black: "#202020",
  madison: "#2c3e50",
  teal: "#21c2f8",
  grey: "#bdc3c7",
  lightGrey: "#f3f7f8",
  red: "#ff0000",
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
