import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router , Route} from 'react-router-dom';
import './i18n';
import * as serviceWorker from './serviceWorker';
import store from './store/store';
import { ThemeProvider, getMashreqTheme , CssBaseline} from "@mashreq-digital/ui";
import GlobalCss from './features/globalCss/GlobalCSS';
import App from "./App";

ReactDOM.render(
  <ThemeProvider theme={getMashreqTheme()}>
    <GlobalCss />
  <Provider store={store}>
    <Router>
    <CssBaseline />
    <Route
      path="*"
      render={renderProps => <App {...renderProps} />}
    />
    </Router>
  </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
