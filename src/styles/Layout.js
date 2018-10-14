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
    grid-template-columns: minmax(140px, 1fr) repeat(9, 1fr);
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
    background: #bdc3c7;
    border-radius: 1px;
  }

  .logged-in .left-dashboard {
    display: grid;
    grid-area: ld;
    background: #2c3e50;
    border-radius: 1px;
  }

  .full-screen .left-dashboard {
    display: grid;
    grid-area: ld;
    background: #2c3e50;
    border-radius: 1px;
  }

  .header {
    display: grid;
    grid-area: nb;
    background: #2c3e50;
    align-content: center;
  }

  .right-dashboard {
    display: grid;
    grid-area: rd;
    background: #bdc3c7;
    border-radius: 1px;
  }

  .diagram {
    display: grid;
    grid-area: td;
    background: #f3f7f8;
    border-radius: 1px;
  }

  @media (max-width: 800px) {
    .logged-in {
      grid-template-columns: minmax(140px, 250px) repeat(2, 1fr);
      grid-template-rows: 75px 1fr;
      justify-content: stretch;
      grid-template-areas:
        "nb nb nb"
        "ld td td";
    }
    .right-dashboard {
      display: none;
    }
  }
`;