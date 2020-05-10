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

// POSTLOGIN ==>
const routes = [
  {
    path: RoutePath.LOGINPAGE,
    component: Login,
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
];

const Routes: FunctionComponent = (): JSX.Element => {
  return (

    <Switch>
    
    <ProtectedRoute path={RoutePath.JOURNEY} component={Journey} />
    <ProtectedRoute path={RoutePath.POSTLOGIN} component={PostLogin} />

    
    {routes.map((route, i) => {
        return (
          <Route path={route.path}>
            <route.component />
          </Route>
        );
      })}
  { //   <ProtectedRoute path={RoutePath.ROOT} component={PostLogin} />

} 

      <Redirect from="*" to={RoutePath.ROOT} />
    
  </Switch>
  );
};

export default Routes;


