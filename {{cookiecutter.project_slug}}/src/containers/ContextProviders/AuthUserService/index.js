import React from 'react';
import PropTypes from 'prop-types';
import { useGet } from 'restful-react';

import SERVER_URLS from 'routes/server';

export const AuthUserContext = React.createContext();
export const AuthUserConsumer = AuthUserContext.Consumer;

export const AuthUserProvider = (props) => {
  const auth = useGet(SERVER_URLS.USER_VERIFY.buildPath());
  if (auth.loading) {
    return null;
  }
  const isNotAuth = !!auth.error;
  return (
    <AuthUserContext.Provider value={{ auth, isAuth: !isNotAuth }}>
      {props.children}
    </AuthUserContext.Provider>
  );
};

AuthUserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};

export default AuthUserProvider;
