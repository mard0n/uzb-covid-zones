import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import StateContextProvider, { initialState } from "./state/StateContext";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import Loader from "./components/Skeletons/Loader";

const Login = React.lazy(() =>
  import(/* webpackChunkName: 'Login' */ "./screens/Login")
);
const Admin = React.lazy(() =>
  import(/* webpackChunkName: 'Admin' */ "./screens/Admin")
);
const User = React.lazy(() =>
  import(/* webpackChunkName: 'User' */ "./screens/User")
);

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Rubik", "Arial", "Helvetica", sans-serif',
    h1: {
      fontSize: 26,
      fontWeight: 500,
    },
    h2: {
      fontSize: 24,
      fontWeight: 500,
    },
    h3: {
      fontSize: 22,
      fontWeight: 500,
    },
    h4: {
      fontSize: 20,
      fontWeight: 500,
    },
    h5: {
      fontSize: 18,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 500,
    },
    body1: {
      fontSize: 16,
      fontWeight: 500,
    },
    body2: {
      fontSize: 16,
      fontWeight: 400,
    },
    caption: {
      fontSize: 14,
      fontWeight: 400,
    },
    overline: {
      fontSize: 12,
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: "#4863F4",
    },
    secondary: {
      main: "#F0F3FE",
      contrastText: "#2E409E",
    },
    text: {
      primary: "#242B43",
      secondary: "#777FA9",
    },
    grey: {
      "500": "#969BAC",
    },
  },
});

function App() {
  return (
    <StateContextProvider initialState={initialState}>
      <ThemeProvider theme={theme}>
        <Router>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path={"/"} exact component={User} />
              <Route path={"/admin"} component={Admin} />
              <Route path={"/login"} component={Login} />
              <Route path="*">Not found</Route>
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    </StateContextProvider>
  );
}

export default App;
