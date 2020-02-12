import React from 'react';
import { Switch, Route } from 'react-router-dom';
import  App from './App';
import {default as Dashboard} from "./features/dashboard";
import {default as Login} from "./features/authentication/Login";
import {default as PersonalInfo} from "./features/personalInformation/MobileInfo";
import {default as Terms} from "./features/personalInformation/Terms";

const Routes: React.FC = () => (
  <Switch>
  <Route path="/" exact component={App}/>
  <Route path="/login"  component={Login}/>
  <Route path="/dashboard"  component={Dashboard}/>
  <Route path="/personal"  component={PersonalInfo}/>
  <Route path="/terms"  component={Terms}/>

  </Switch>
);

export default Routes;
