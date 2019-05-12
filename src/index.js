import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { ApolloLink, concat } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ThemeProvider } from "styled-components";
import NotLoggedIn from "./components/Layout/NotLoggedIn";
import LoggedIn from "./components/Layout/LoggedIn";
import FourOFour from "./components/Static/FourOFour";
import { Theme } from "./styles";
import { API, LOCAL_API, BASENAME } from "./helpers/const";
import * as serviceWorker from "./registerServiceWorker";

const dev = process.env.NODE_ENV === "development";
console.log("process.env", process.env);
const uri = dev ? LOCAL_API : API;
console.log("uri:", uri);
const basename = dev ? "" : BASENAME;
const httpLink = createHttpLink({ uri });

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

const Index = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={Theme}>
      <BrowserRouter basename={basename}>
        <Switch>
          <Route path="/(login|signup|logout|)" component={NotLoggedIn} />
          <Route path="/main" component={LoggedIn} />
          <Route component={FourOFour} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>
);

ReactDOM.render(<Index />, document.querySelector("#root"));

serviceWorker.register();
