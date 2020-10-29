import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, Redirect } from 'react-router';

import CLIENT_URLS from 'routes/client';

import IsUserAuth from 'containers/Auth/IsUserAuth';
import Auth from 'containers/Auth';
import Main from 'containers/Main';
import NotFoundRoute from 'containers/Errors/NotFoundRoute';
import ErrorHandler from 'containers/Errors/Handler';
import { AuthUserContext } from 'containers/ContextProviders/AuthUserService';

import { _ } from 'utils/trans';

const App = () => {
  const authContext = useContext(AuthUserContext);
  return (
    <>
      <Helmet
        titleTemplate="%s"
        defaultTitle={_('Default title')}
      >
        <meta name="description" content={_('Default description')} />
      </Helmet>
      <ErrorHandler>
        <Switch>
          <Route
            path={CLIENT_URLS.INDEX.route}
            exact
            render={() => {
              if (!authContext.isAuth) {
                return <Redirect to={CLIENT_URLS.AUTH.INDEX.buildPath()} />;
              }
              return (
                <Redirect to={CLIENT_URLS.MAIN.INDEX.buildPath()} />
              );
            }}
          />
          <Route path={CLIENT_URLS.AUTH.INDEX.route} component={Auth} />
          <Route
            path={CLIENT_URLS.MAIN.INDEX.route}
            render={(props) => (
              <IsUserAuth {...props}>
                <Main {...props} />
              </IsUserAuth>
            )}
          />
          <NotFoundRoute />
        </Switch>
      </ErrorHandler>
    </>
  );
};

export default App;
