import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import PinInput from 'react-pin-input';
import { Row, Col, Form, Button, Layout } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { useMutate } from 'restful-react';
import { useHistory, useLocation, Link, Redirect } from 'react-router-dom';
import queryString from 'query-string';

import { _ } from 'utils/trans';

import { AuthUserContext } from 'containers/ContextProviders/AuthUserService';
import CLIENT_URLS from 'routes/client';
import SERVER_URLS from 'routes/server';

import authStyles from 'containers/Auth/index.module.scss';

const { Content } = Layout;

const SignIn2FA = () => {
  const history = useHistory();
  const location = useLocation();
  const getParams = queryString.parse(location.search);
  const authContext = useContext(AuthUserContext);
  const [formData, changeFormData] = useState({
    code: '',
  });
  const [formErrors, changeFormErrors] = useState({});
  const { mutate, loading } = useMutate({
    verb: 'POST',
    path: SERVER_URLS.SIGN_IN_2FA.buildPath(),
  });

  const onFinish = async () => {
    try {
      await mutate(formData);
      changeFormErrors({});
      if (getParams.next) {
        window.location.href = getParams.next;
      } else {
        authContext.auth.refetch();
        history.push(CLIENT_URLS.MAIN.INDEX.buildPath());
      }
    } catch (errors) {
      if (errors.status === 400) {
        changeFormErrors(errors.data);
      }
    }
  };

  if (authContext.isAuth) {
    return <Redirect to={CLIENT_URLS.MAIN.INDEX.buildPath()} />;
  }

  return (
    <Layout>
      <Helmet>
        <title>{_('Log In')}</title>
        <meta name="description" content={_('Log In')} />
      </Helmet>
      <Content className={authStyles.content}>
        <Row justify="center">
          <Col xs={20} sm={20} md={10} lg={10} xl={8}>
            <div className={authStyles.title}>{_('Enter your SMS Code')}</div>
            <div className={authStyles.subTitle}>
              {_(
                'Please enter the 2-factor authentication code we just sent to your phone',
              )}
            </div>
            <div className={authStyles.subTitle}>
              {_("Didn't recieve one?")}{' '}
              <Link to={CLIENT_URLS.AUTH.SIGN_IN.buildPath()}>send again</Link>{' '}
              or <Link to="#">contact us</Link>
            </div>
            <Form
              layout="vertical"
              onFinish={onFinish}
              className={classNames('auth-form', authStyles.form)}
            >
              <Form.Item
                label={_('2FA Code')}
                name="code"
                rules={[
                  {
                    required: true,
                  },
                ]}
                validateStatus={
                  formErrors.code || formErrors.non_field_errors
                    ? 'error'
                    : undefined
                }
                help={formErrors.code || formErrors.non_field_errors}
              >
                <PinInput
                  length={6}
                  type="numeric"
                  inputMode="number"
                  initialValue={formData.password}
                  onChange={(value) => {
                    changeFormData({
                      ...formData,
                      code: value,
                    });
                  }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                  }}
                  inputStyle={{
                    borderColor: 'white',
                    background: 'white',
                  }}
                  inputFocusStyle={{ borderColor: 'blue' }}
                />
              </Form.Item>
              <Button
                htmlType="submit"
                loading={loading}
                className={authStyles.submitBtn}
              >
                <LoginOutlined /> {_('Sign In')}
              </Button>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default SignIn2FA;
