import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Result } from 'antd';
import { useHistory } from 'react-router';

import { _ } from 'utils/trans';
import CLIENT_URLS from 'routes/client';

const NotFoundPage = () => {
  const history = useHistory();
  return (
    <>
      <Helmet>
        <title>{_('404')}</title>
        <meta name="description" content={_('404')} />
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle={_('Sorry, the page you visited does not exist.')}
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

export default NotFoundPage;
