import React, { FunctionComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../features/authentication/Login";
import PersonalInformation from "../features/createAccount";
import MobileNumber from "../features/createAccount/MobileNumber";
import PasswordScreen from "../features/createAccount/PasswordScreen";
// import Test from "../pages/test";
import * as RoutePath from "./config";
import PostLogin from "../features/postLogin/";
import MoneyTransfer from '../features/postLogin/moneyTransfer/index';
import Kyc from "../features/kyc/Kyc";
const NoMatchPage = () => {
  return <h3>404 - Not found</h3>;
};

const routes = [
  {
    path: RoutePath.LOGINPAGE,
    component: Login
  },
  {
    path: RoutePath.ROOT,
    component: PostLogin
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
    component: PersonalInformation
  },
  {
    path: RoutePath.KYC,
    component: Kyc
  },
  // {
  //   path: RoutePath.TEST,
  //   component: Test
  // },
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
      <Redirect exact from='/' to={RoutePath.LOGINPAGE}/>
      {routes.map((route, i) => {
        return <RouteConfig key={i} {...route} />;
      })}
    </Switch>
  );
};

export default Routes;
