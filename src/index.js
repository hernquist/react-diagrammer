import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { ApolloLink, concat } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import NotLoggedIn from "./components/Layout/NotLoggedIn";
import LoggedIn from "./components/Layout/LoggedIn";
import "./styles/index.css";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql"
});

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      ["x-token"]: localStorage.getItem("token") || null,
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
      <BrowserRouter>
        <div>
          <Route 
            path="/(login|signup|logout|)" 
            component={NotLoggedIn} />
          <Route path="/main" component={LoggedIn} />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Index />, document.querySelector("#root"));
