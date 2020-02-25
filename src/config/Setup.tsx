import React, { FunctionComponent } from "react";
import {
  ThemeProvider,
  getMashreqTheme,
  CssBaseline
} from "@mashreq-digital/ui";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RTL from "./RTL";
import GlobalCss from "./GlobalCSS";
import { useSelector } from "react-redux";
import App from "../App";

const Setup: FunctionComponent = (): JSX.Element => {
  const dir = useSelector((state: any) => state.globalState.direction);

  return (
    <ThemeProvider theme={getMashreqTheme(undefined, undefined, dir)}>
      <RTL>
        <GlobalCss />
        <Router>
          <CssBaseline />
          <Route path="*" render={renderProps => <App {...renderProps} />} />
        </Router>
      </RTL>
    </ThemeProvider>
  );
};

export default Setup;
