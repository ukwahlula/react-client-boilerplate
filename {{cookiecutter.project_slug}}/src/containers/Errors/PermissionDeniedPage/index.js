import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Result } from 'antd';
import { useHistory } from 'react-router';

import { _ } from 'utils/trans';
import CLIENT_URLS from 'routes/client';

const PermissionDeniedPage = () => {
  const history = useHistory();
  return (
    <>
      <Helmet>
        <title>{_('404')}</title>
        <meta name="description" content={_('404')} />
      </Helmet>
      <Result
        status="403"
        title="403"
        subTitle={_('Sorry, you are not authorized to access this page.')}
        extra={
          <Button
            type="primary"
            onClick={() => history.push(CLIENT_URLS.INDEX.buildPath())}
          >
            {_('Back Home')}
          </Button>
        }
      />
      >
    </>
  );
};

export default PermissionDeniedPage;
