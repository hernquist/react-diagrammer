import styled, { injectGlobal } from "styled-components";

const madison = "#2c3e50";
const black = "#202020";
const teal = "#21c2f8";
const grey = "#bdc3c7";
const lightGrey = "#f3f7f8";
const red = "#ff0000";
const lightBlue = "lightBlue";

export const Theme = { 
  black,
  madison,
  teal,
  grey,
  lightGrey,
  lightBlue,
  red,
  maxWidth: "1000px",
  bs1: `1px 1px 1px 1px ${madison}`,
  bs2: `2px 2px 2px 2px ${madison}`,
  bs3: `3px 3px 3px 3px ${madison}`
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
