import React, { useContext } from 'react';
import { Layout } from 'antd';

import { AuthUserContext } from 'containers/ContextProviders/AuthUserService';

const Main = () => {
  const authContext = useContext(AuthUserContext);
  const authUser = authContext.auth ? authContext.auth.data : {};
  console.log(authUser);
  return (
    <Layout>
      Main
    </Layout>
  );
};

export default Main;
