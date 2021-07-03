import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.scss";
import App from "./App";

// Global Url
const GITHUB_BASE_URL = "https://api.github.com/graphql";

// Access Token used to the app -> flow
const ACCESS_TOKEN = "";

// Setting up our client
const client = new ApolloClient({
  uri: GITHUB_BASE_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

// Export to render -> APP level

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
