import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../features/authentication/Login";
import CreateAccount from "../features/createAccount";

import { ROUTE_LOGINPAGE, ROUTER_ACCOUNT_CREATE } from "./config";
const NoMatchPage = () => {
  return <h3>404 - Not found</h3>;
};
const Routes: FunctionComponent = (): JSX.Element => {
  return (
    <Switch>
    
      <Route
        path={ROUTER_ACCOUNT_CREATE}
        render={routerProps => <CreateAccount {...routerProps} />}
      />
      <Route  path="*" component={NoMatchPage} />
    </Switch>
  );
};

export default Routes;


// <Route
// exact
//  path={ROUTE_LOGINPAGE}
//  render={routerProps => <Login {...routerProps} />}
// />