import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../features/authentication/Login";
import CreateAccount from "../features/createAccount";
import MobileNumber from "../features/createAccount/MobileNumber";
import PasswordScreen from "../features/createAccount/PasswordScreen";
import {
  ROUTE_LOGINPAGE,
  ROUTER_ACCOUNT_CREATE,
  ROUTE_MOBILEINFO
} from "./config";
const NoMatchPage = () => {
  return <h3>404 - Not found</h3>;
};
const Routes: FunctionComponent = (): JSX.Element => {
  return (
    <Switch>
      <Route
        exact
        path={ROUTE_LOGINPAGE}
        render={routerProps => <Login {...routerProps} />}
      />

      <Route
        path={"/pass"}
        render={routerProps => <PasswordScreen {...routerProps} />}
      />

      <Route
        path={ROUTE_MOBILEINFO}
        render={routerProps => <MobileNumber {...routerProps} />}
      />

      <Route
        path={ROUTER_ACCOUNT_CREATE}
        render={routerProps => <CreateAccount {...routerProps} />}
      />
      <Route path="*" component={NoMatchPage} />
    </Switch>
  );
};

export default Routes;
