import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { ApolloLink, concat } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import App from "./components/App";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import LogoutForm from "./components/Auth/LogoutForm";
import Main from "./components/Main/Main";

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
        <div className="body">
          <Route path="/" component={App} />
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/logout" component={LogoutForm} />
          <Route path="/main" component={Main} />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Index />, document.querySelector("#root"));
