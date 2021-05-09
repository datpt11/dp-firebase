import React from 'react';

import HomePage from 'containers/HomePage';
import LayoutAnonymous from 'containers/LayoutAnonymous';
import LayoutAuthenticated from 'containers/LayoutAuthenticated';
import LoginPage from 'containers/LoginPage';
import { NotFoundPage } from 'containers/NotFoundPage';
import RegisterPage from 'containers/RegisterPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { PublicPage, PrivatePage } from './types';

export const publicPages: PublicPage[] = [
  {
    path: '/signin',
    exact: true,
    component: LoginPage,
  },
  {
    path: '/signup',
    exact: true,
    component: RegisterPage,
  },
];

export const privatePages: PrivatePage[] = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
];

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={['/signin', '/signup', '/forgot-password']}>
          <LayoutAnonymous>
            {publicPages.map(({ component, path, exact }) => {
              return <PublicRoute key={path} component={component} exact={exact} path={path} />;
            })}
          </LayoutAnonymous>
        </Route>
        <Route exact path={['/']}>
          <LayoutAuthenticated>
            {privatePages.map(({ component, path, exact }) => {
              return <PrivateRoute key={path} component={component} exact={exact} path={path} />;
            })}
          </LayoutAuthenticated>
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
