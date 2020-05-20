import React, { FunctionComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../features/authentication/Login";
import PersonalInformation from "../features/createAccount";
import MobileNumber from "../features/createAccount/MobileNumber";
import PasswordScreen from "../features/createAccount/PasswordScreen";
import * as RoutePath from "./config";
import PostLogin from "../features/postLogin/";
import Journey from "../features/journey/index";
import ProtectedRoute from "./ProtectedRoute";
import MoneyTransfer from '../features/postLogin/moneyTransfer/index';
import Kyc from "../features/kyc";
import Cif from "../features/authentication/Cif";

// const NoMatchPage = () => {
//   return <h3>404 - Not found</h3>;
// };

// POSTLOGIN ==>
const routes = [
  {
    path: RoutePath.LOGINPAGE,
    component: Login
    },
    {
      path: RoutePath.CIF,
      component: Cif
    },
  {
    path: RoutePath.KYC,
    component: Kyc
  },
  {
    path: RoutePath.JOURNEY,
    component: Journey
  },
  {
    path: RoutePath.POSTLOGIN,
    component: PostLogin
  },
  {
    path: RoutePath.PASSCODE,
    component: PasswordScreen,
  },
  {
    path: RoutePath.MOBILEINFO,
    component: MobileNumber,
  },
  {
    path: RoutePath.CREATE_ACCOUNT,
    component: PersonalInformation,
  },

  // {
  //   path: RoutePath.TEST,
  //   component: Test
  // },
  // {
  //   path: RoutePath.OTHER_ROUTES,
  //   component: NoMatchPage
  // }
];

const Routes: FunctionComponent = (): JSX.Element => {
  return (

    <Switch>
    <Route key={"login"} exact path={RoutePath.ROOT}>
      <Login/>
    </Route>

    {routes.map((route, i) => {
        return (
          <Route key={i} path={route.path} >
            <route.component />
          </Route>
        );
      })}

  { 
  // <ProtectedRoute path={RoutePath.JOURNEY} component={Journey} />
  // <ProtectedRoute path={RoutePath.POSTLOGIN} component={PostLogin} />  
} 

      <Redirect from="*" to={RoutePath.ROOT} />
    
  </Switch>
  );
};

export default Routes;


