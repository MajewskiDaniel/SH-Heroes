import React, { Component, PropsWithChildren } from "react";
import { Route, Redirect } from "react-router-dom";

interface IGuardedRouteProps {
  component: Component;
  auth: boolean;
}

const GuardedRoute: React.FC<PropsWithChildren<IGuardedRouteProps>> = ({
  component: Component,
  auth,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      auth === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default GuardedRoute;
