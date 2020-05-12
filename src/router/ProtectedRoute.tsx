import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import * as RoutePath from "./config";
import isAuthenticated from '../util/isAuthenticated';

const ProtectedRoute = ({ component: Component, path }: RouteProps) => {
  if (!isAuthenticated()) {
    return <Redirect to={RoutePath.LOGINPAGE} />;
  }
  return <Route component={Component} path={path} />;
};

export default ProtectedRoute;