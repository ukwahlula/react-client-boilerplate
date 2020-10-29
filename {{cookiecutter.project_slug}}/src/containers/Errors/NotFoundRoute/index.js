import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import CLIENT_URLS from 'routes/client';
import { ROUTE_NOT_FOUND } from '../constants';

const NotFoundRoute = () => (
  <Route
    path={CLIENT_URLS.NOT_FOUND.route}
    render={({ location }) => (
      <Redirect
        to={{
          ...location,
          state: {
            ...(location.state || {}),
            error: ROUTE_NOT_FOUND,
          },
        }}
      />
    )}
  />
);

export default NotFoundRoute;
