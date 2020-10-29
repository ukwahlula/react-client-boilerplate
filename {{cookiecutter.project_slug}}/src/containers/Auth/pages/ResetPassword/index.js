import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CLIENT_URLS from 'routes/client';
import NotFoundRoute from 'containers/Errors/NotFoundRoute';

import SendVerificationEmail from './SendVerificationEmail';
import Password from './Password';

const ResetPassword = () => (
  <Switch>
    <Route
      path={CLIENT_URLS.AUTH.RESET_PASSWORD.INDEX.route}
      exact
      render={() => (
        <Redirect
          to={CLIENT_URLS.AUTH.RESET_PASSWORD.SEND_EMAIL_VERIFICATION.buildPath()}
        />
      )}
    />
    <Route
      exact
      path={CLIENT_URLS.AUTH.RESET_PASSWORD.SEND_EMAIL_VERIFICATION.route}
      component={SendVerificationEmail}
    />
    <Route
      exact
      path={CLIENT_URLS.AUTH.RESET_PASSWORD.PASSWORD.route}
      component={Password}
    />
    <NotFoundRoute />
  </Switch>
);

export default ResetPassword;
