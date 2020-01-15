import React from 'react';
import { Switch, Route } from 'react-router-dom';
import  App from './App';
import {default as Dashboard} from "./features/dashboard"


const Routes: React.FC = () => (
  <Switch>
  <Route path="/" exact component={App}/>
  <Route path="/dashboard"  component={Dashboard}/>

  </Switch>
);

export default Routes;
