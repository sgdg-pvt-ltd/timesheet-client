import { ApolloProvider } from "@apollo/client";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import useApolloService from "./services/apollo";
import AppRouter from "./app/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import React from "react";
import { theme } from "./theme/theme";

function App() {
  const { client } = useApolloService();
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <h1>loading...</h1>
        </div>
      }
    >
      <Router>
        <ApolloProvider client={client}>
          <MantineProvider classNamesPrefix="sgdg" theme={theme}>
            <Notifications position="top-right" />
            <AppRouter />
          </MantineProvider>
        </ApolloProvider>
      </Router>
    </React.Suspense>
  );
}

export default App;
