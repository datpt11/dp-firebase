import React, { FC } from 'react';

import { useSelector } from 'react-redux';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import { Role } from './types';

export interface PrivateRouteProps extends RouteProps {
  roles: Role[];
}

// Lấy từ redux
interface Auth {
  isLoggedIn: boolean;
  role: Role;
}
const authSelector = (): Auth => ({
  isLoggedIn: true,
  role: 'admin',
});

const PrivateRoute: FC<PrivateRouteProps> = ({ roles, ...rest }) => {
  const { isLoggedIn, role } = useSelector(authSelector);
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  if (!roles.includes(role)) {
    return <Redirect to="/role-redirect" />;
  }
  return <Route {...rest} />;
};

export default PrivateRoute;
