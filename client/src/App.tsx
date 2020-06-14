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
const Login = React.lazy(() => import("./screens/Login"));
const Admin = React.lazy(() => import("./screens/Admin"));
const User = React.lazy(() => import("./screens/User"));

function App() {
  return (
    <StateContextProvider initialState={initialState}>
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
    </StateContextProvider>
  );
}

export default App;
