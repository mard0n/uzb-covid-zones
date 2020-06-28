import React, { Suspense, useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import StateContextProvider, { initialState } from "./state/StateContext";
import auth from "./utils/auth";
import ProtectedRoute from "./routes/ProtectedRoute";
import {
  ThemeProvider,
  createMuiTheme,
  useMediaQuery,
  Theme,
} from "@material-ui/core";
const Login = React.lazy(() => import("./screens/Login"));
const Admin = React.lazy(() => import("./screens/Admin"));
const User = React.lazy(() => import("./screens/User"));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4863F4",
    },
    secondary: {
      main: "#FF6496",
    },
    text: {
      primary: "#242B43",
      secondary: "#777FA9",
    },
    grey: {
      "500": "#969BAC",
    },
  },
  typography: {
    h1: {
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
      fontWeight: 400,
    },
    caption: {
      fontSize: 14,
      fontWeight: 400,
    },
    overline: {
      fontSize: 12,
      fontWeight: 400,
    },
  },
});

theme.typography.h1 = {
  fontSize: 24,
  [theme.breakpoints.up("md")]: {
    fontSize: 26,
  },
};
theme.typography.body2 = {
  fontSize: 14,
  [theme.breakpoints.up("md")]: {
    fontSize: 16,
  },
};

function App() {
  return (
    <StateContextProvider initialState={initialState}>
      <ThemeProvider theme={theme}>
        <Router>
          <Suspense fallback={<div>Loading... </div>}>
            <Switch>
              <Route path={"/app"} component={User} />
              {/* <ProtectedRoute
              path={"/admin"}
              component={Admin}
            /> */}
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
