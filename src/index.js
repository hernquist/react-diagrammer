import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { ApolloLink, concat } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ThemeProvider } from "styled-components";

import NotLoggedIn from "./components/Layout/NotLoggedIn";
import LoggedIn from "./components/Layout/LoggedIn";
import { theme } from "./styles";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql"
});

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      // eslint-disable-next-line
      ["x-token"]: localStorage.getItem("token") || null,
      // eslint-disable-next-line
      ["x-refresh-token"]: localStorage.getItem("refreshToken") || null
    }
  });
  return forward(operation);
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: concat(middlewareLink, httpLink),
  cache
});

const Index = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Fragment>
            <Route path="/(login|signup|logout|)" component={NotLoggedIn} />
            <Route path="/main" component={LoggedIn} />
          </Fragment>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<Index />, document.querySelector("#root"));
