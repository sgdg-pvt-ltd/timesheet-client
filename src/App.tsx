import { ApolloProvider } from "@apollo/client";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import useApolloService from "./services/apollo";
import AppRouter from "./app/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const { client } = useApolloService();
  return (
    <Router>
      <ApolloProvider client={client}>
        <MantineProvider classNamesPrefix="sgdg">
          <AppRouter />
        </MantineProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;
