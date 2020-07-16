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
import RubikRegularWoff2 from "./assets/fonts/Rubik-Regular.woff2";
import RubikRegularWoff from "./assets/fonts/Rubik-Regular.woff";
import RubikRegularTtf from "./assets/fonts/Rubik-Regular.ttf";
import RubikMediumWoff2 from "./assets/fonts/Rubik-Medium.woff2";
import RubikMediumWoff from "./assets/fonts/Rubik-Medium.woff";
import RubikMediumTtf from "./assets/fonts/Rubik-Medium.ttf";

const Login = React.lazy(() => import("./screens/Login"));
const Admin = React.lazy(() => import("./screens/Admin"));
const User = React.lazy(() => import("./screens/User"));

/* rubik-regular - latin_cyrillic */
const raleway = {
  fontFamily: "Rubik",
  fontStyle: "normal",
  fontWeight: 400,
  src: `
    local('Raleway'),
    local('Raleway-Regular'),
    url(${RubikRegularWoff2}) format('woff2'),
    url(${RubikRegularWoff}) format('woff'),
    url(${RubikRegularTtf}) format('truetype')
  `,
  // unicodeRange:
  //   'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};
const RubikRegular = {
  fontFamily: "Rubik",
  fontStyle: "normal",
  fontWeight: 400,
  src: `
    local('Rubik'),
    local('Rubik-Regular'),
    url(${RubikRegularWoff2}) format('woff2'),
    url(${RubikRegularWoff}) format('woff'), 
    url(${RubikRegularTtf}) format('truetype')`,
};
/* rubik-500 - latin_cyrillic */
const RubikMedium = {
  fontFamily: "Rubik",
  fontStyle: "normal",
  fontWeight: 500,
  src: `
    local('Rubik Medium'),
    local('Rubik-Medium'),
    url(${RubikMediumWoff2}) format('woff2'),
    url(${RubikMediumWoff}) format('woff'),
    url(${RubikMediumTtf}) format('truetype')`,
};

const theme = createMuiTheme({
  typography: {
    fontFamily: "Rubik",
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
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [RubikRegular, RubikMedium],
      },
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

// theme.typography.h1 = {
//   fontFamily: 'Rubik',
//   fontWeight: 500,
//   letterSpacing: "-0.01562em",
//   lineHeight: 1.167,
//   fontSize: 24,
//   [theme.breakpoints.up("md")]: {
//     fontSize: 26,
//   },
// };
// theme.typography.body2 = {
//   // fontFamily: 'Rubik',
//   fontFamily: '"Rubik", "Arial", "Helvetica", sans-serif',
//   fontWeight: 400,
//   letterSpacing: "0.01071em",
//   lineHeight: 1.43,
//   fontSize: 14,
//   [theme.breakpoints.up("md")]: {
//     fontSize: 16,
//   },
// };

function App() {
  console.log("theme ", theme);
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
