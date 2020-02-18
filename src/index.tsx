import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import i18n from "./i18n";
import * as serviceWorker from "./serviceWorker";
import { I18nextProvider } from "react-i18next";

import store from "./store/store";
import {
  ThemeProvider,
  getMashreqTheme,
  CssBaseline
} from "@mashreq-digital/ui";
import GlobalCss from "./features/globalCss/GlobalCSS";
import App from "./App";

ReactDOM.render(
  <ThemeProvider theme={getMashreqTheme(undefined, undefined, "ltr")}>
    <div dir="ltr">
      <GlobalCss />
      <Provider store={store}>
      <I18nextProvider i18n={i18n}>

        <Router>
          <CssBaseline />
          <Route path="*" render={renderProps => <App {...renderProps} />} />
        </Router>
      </I18nextProvider> 
      </Provider>
    </div>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
