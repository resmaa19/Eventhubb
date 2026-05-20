import React from "react";
import { Router } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";

function App() {

  const theme = createTheme({
    /** Put your mantine theme override here */
  });

  

  return (
    <MantineProvider theme={theme}>
      <Layout />
    </MantineProvider>
  );
}

export default App;
