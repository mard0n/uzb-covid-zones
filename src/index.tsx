import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './router';
import './i18n';
import * as serviceWorker from './serviceWorker';
import store from './store/store';
import { ThemeProvider, getMashreqTheme } from "@mashreq-digital/ui";
import GlobalCss from './features/globalCss/GlobalCSS';

ReactDOM.render(
  <ThemeProvider theme={getMashreqTheme()}>
    <GlobalCss />
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
