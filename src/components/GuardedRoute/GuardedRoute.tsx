import React from "react";
import { Route, Redirect } from "react-router-dom";

interface IGuardedRouteProps {
  component: React.FC;
  auth: boolean;
  path: string;
  exact?: boolean;
}

const GuardedRoute: React.FC<IGuardedRouteProps> = ({
  component: Component,
  auth,
  path,
  exact,
}) => (
  <Route
    path={path}
    exact={exact}
    render={() => (auth ? <Component /> : <Redirect to="/" />)}
  />
);

export default GuardedRoute;
