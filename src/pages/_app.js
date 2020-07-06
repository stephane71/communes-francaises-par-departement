import React from "react";
import App from "next/app";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "../theme";
import "../styles.css";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </MuiThemeProvider>
    );
  }
}

export default MyApp;
