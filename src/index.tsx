import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import i18n from "./config/i18n";
import * as serviceWorker from "./serviceWorker";
import { I18nextProvider } from "react-i18next";

import store from "./store/store";
import Setup from "./config/Setup";

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <Setup />
    </I18nextProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
