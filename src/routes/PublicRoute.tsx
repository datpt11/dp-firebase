import React, { FC } from 'react';

import { useSelector } from 'react-redux';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { authSelector } from 'store/general/selectors';

export interface PublicRouteProps extends RouteProps {}

const PublicRoute: FC<PublicRouteProps> = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useSelector(authSelector);

  if (!Component) return null;

  return <Route {...rest} render={props => (!isLoggedIn ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: props.location }} />)} />;
};

export default PublicRoute;
