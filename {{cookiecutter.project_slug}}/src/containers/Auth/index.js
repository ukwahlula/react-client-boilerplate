import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import CLIENT_URLS from 'routes/client';
import NotFoundRoute from 'containers/Errors/NotFoundRoute';

import SignIn from './pages/SignIn';
import SignIn2FA from './pages/SignIn2FA';
import ResetPassword from './pages/ResetPassword';

const Auth = () => (
  <Layout>
    <Switch>
      <Route
        exact
        path={CLIENT_URLS.AUTH.INDEX.route}
        render={() => {
          return <Redirect to={CLIENT_URLS.AUTH.SIGN_IN.buildPath()} />;
        }}
      />
      <Route exact path={CLIENT_URLS.AUTH.SIGN_IN.route} component={SignIn} />
      <Route
        exact
        path={CLIENT_URLS.AUTH.SIGN_IN_2FA.route}
        component={SignIn2FA}
      />
      <Route
        path={CLIENT_URLS.AUTH.RESET_PASSWORD.route}
        component={ResetPassword}
      />
      <NotFoundRoute />
    </Switch>
  </Layout>
);

export default Auth;
