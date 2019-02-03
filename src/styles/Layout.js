import styled from "styled-components";

export const Layout = styled.div`
  .logged-out {
    display: grid;
    height: 100vh;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: 75px 1fr;
    grid-template-areas:
      "nb nb nb nb nb nb nb nb nb nb"
      "ld ld ld td td td td td rd rd";
  }

  .logged-in {
    display: grid;
    height: 100vh;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 130px 130px 130px;
    grid-template-rows: 48px 32px 1fr;
    grid-template-areas:
      "nb nb nb nb nb nb nb nb nb nb"
      "ld ld ld ld ld ld ld ld ld ld"
      "td td td td td td td rd rd rd";
  }

  .full-screen {
    display: grid;
    height: 100vh;
    grid-template-columns: minmax(140px, 1fr) repeat(9, 1fr);
    grid-template-rows: 48px 32px 1fr;
    grid-template-areas:
      "nb nb nb nb nb nb nb nb nb nb"
      "ld ld ld ld ld ld ld ld ld ld"
      "td td td td td td td td td td";
  }

  .logged-out .left-dashboard {
    display: grid;
    grid-area: ld;
    background: ${props => props.theme.grey};
    border-radius: 1px;
  }

  .logged-in .left-dashboard {
    display: grid;
    grid-area: ld;
    background: ${props => props.theme.madison};
    border-radius: 1px;
  }

  .full-screen .left-dashboard {
    display: grid;
    grid-area: ld;
    background: ${props => props.theme.madison};
    border-radius: 1px;
  }

  .header {
    display: grid;
    grid-area: nb;
    background: ${props => props.theme.madison};
    align-content: center;
  }

  .right-dashboard {
    display: grid;
    grid-area: rd;
    background: ${props => props.theme.grey};
    border-radius: 1px;
  }

  .diagram {
    display: grid;
    grid-area: td;
    background: ${props => props.theme.lightGrey};
    border-radius: 1px;
  }

  .layout {
    @media (max-width: 800px) {
      .logged-in {
        grid-template-columns: minmax(140px, 250px) repeat(2, 1fr);
        grid-template-rows: 75px 1fr;
        justify-content: stretch;
        grid-template-areas:
          "nb nb nb"
          "ld ld ld"
          "td td td";
      }
      .right-dashboard {
        display: none;
      }
    }
  }
`;
