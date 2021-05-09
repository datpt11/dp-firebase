import React, { FC } from 'react';

import { useSelector } from 'react-redux';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { authSelector } from 'store/general/selectors';

export interface PrivateRouteProps extends RouteProps {}

// Lấy từ redux

const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useSelector(authSelector);

  if (!Component) return null;

  return (
    <Route {...rest} render={props => (isLoggedIn ? <Component {...props} /> : <Redirect to={{ pathname: '/signin', state: props.location }} />)} />
  );
};

export default PrivateRoute;
