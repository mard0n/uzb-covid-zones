import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../features/authentication/Login";
import CreateAccount from "../features/createAccount";
import MobileNumber from "../features/createAccount/MobileNumber";
import PasswordScreen from "../features/createAccount/PasswordScreen";
import * as RoutePath from "./config";
const NoMatchPage = () => {
  return <h3>404 - Not found</h3>;
};

const routes = [
  {
    path: RoutePath.LOGINPAGE,
    component: Login
  },
  {
    path: RoutePath.PASSCODE,
    component: PasswordScreen
  },
  {
    path: RoutePath.MOBILEINFO,
    component: MobileNumber
  },
  {
    path: RoutePath.CREATE_ACCOUNT,
    component: CreateAccount
  },
  {
    path: RoutePath.OTHER_ROUTES,
    component: NoMatchPage
  }
];

export const RouteConfig = (route: any) => {
  return (
    <Route path={route.path} render={props => <route.component {...props} />} />
  );
};

const Routes: FunctionComponent = (): JSX.Element => {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteConfig key={i} {...route} />;
      })}
    </Switch>
  );
};

export default Routes;
