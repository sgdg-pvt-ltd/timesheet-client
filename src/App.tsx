import { ApolloProvider } from "@apollo/client";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import useApolloService from "./services/apollo";
import AppRouter from "./app/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { Notifications } from "@mantine/notifications";

function App() {
  const { client } = useApolloService();
  return (
    <Router>
      <ApolloProvider client={client}>
        <MantineProvider classNamesPrefix="sgdg">
          <Notifications position="top-right" />
          <AppRouter />
        </MantineProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;
