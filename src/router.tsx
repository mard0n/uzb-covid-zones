import React from 'react';
import { Switch, Route } from 'react-router-dom';
import  App from './App';
import {default as Dashboard} from "./features/dashboard";
import {default as Login} from "./features/authentication/Login";
import {default as PersonalInfo} from "./features/personalInfo/MobileInfo";
import {default as Terms} from "./features/personalInfo/Terms";
import {default as Locked} from "./features/personalInfo/Locked";

const Routes: React.FC = () => (
  <Switch>
  <Route path="/" exact component={App}/>
  <Route path="/login"  component={Login}/>
  <Route path="/dashboard"  component={Dashboard}/>
  <Route path="/personal"  component={PersonalInfo}/>
  <Route path="/terms"  component={Terms}/>
  <Route path="/locked"  component={Locked}/>

  </Switch>
);

export default Routes;
