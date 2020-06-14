import React, { ReactComponentElement, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../utils/auth";

export interface ProtectedRouteProps {
  component: any;
  path: any;
}

const ProtectedRoute: React.SFC<ProtectedRouteProps> = ({
  component: Component,
  path,
  ...rest
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticating, setAuthenticating] = useState(true);
  useEffect(() => {
    setAuthenticating(true);
    auth.isAuthenticated().then((isAuth: any) => {
      console.log("isAuth", isAuth);
      setIsAuthenticated(isAuth);
      setAuthenticating(false);
    });
  }, []);
  return (
    <Route
      {...rest}
      path={path}
      render={(props) => {
        if (!authenticating) {
          if (isAuthenticated) {
            return <Component {...props} />;
          } else {
            // return <div>hello</div>;
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location.pathname,
                  },
                }}
              />
            );
          }
        }
      }}
    />
  );
};

export default ProtectedRoute;
