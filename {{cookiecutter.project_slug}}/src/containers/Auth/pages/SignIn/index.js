import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import { Row, Col, Form, Input, Button, Layout, Alert } from 'antd';
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useMutate } from 'restful-react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';

import { _ } from 'utils/trans';

import { AuthUserContext } from 'containers/ContextProviders/AuthUserService';
import CLIENT_URLS from 'routes/client';
import SERVER_URLS from 'routes/server';

import authStyles from 'containers/Auth/index.module.scss';

const { Content } = Layout;

const SignIn = () => {
  const history = useHistory();
  const location = useLocation();
  const getParams = queryString.parse(location.search);
  const authContext = useContext(AuthUserContext);
  const [formData, changeFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, changeFormErrors] = useState({});
  const { mutate, loading } = useMutate({
    verb: 'POST',
    path: SERVER_URLS.SIGN_IN.buildPath(),
  });

  const onFinish = async () => {
    try {
      await mutate(formData);
      changeFormErrors({});
      if (getParams.next) {
        window.location.href = getParams.next;
      } else {
        authContext.auth.refetch();
        history.push(CLIENT_URLS.AUTH.SIGN_IN_2FA.buildPath());
      }
    } catch (errors) {
      if (errors.status === 400) {
        changeFormErrors(errors.data);
      }
    }
  };

  const successResetPassword = getParams.success_reset_password;

  return (
    <Layout>
      <Helmet>
        <title>{_('Log In')}</title>
        <meta name="description" content={_('Log In')} />
      </Helmet>
      <Content className={authStyles.content}>
        <Row justify="center">
          <Col xs={20} sm={20} md={10} lg={10} xl={8}>
            <div className={authStyles.title}>{_('Log In')}</div>
            <div className={authStyles.subTitle}>
              {_("Please log in")}
            </div>

            {successResetPassword && (
              <Alert
                message={_(
                  'You successfully reset your password. You can log in using your new password.',
                )}
                type="success"
                className={authStyles.alert}
                closable
              />
            )}

            <Form
              layout="vertical"
              onFinish={onFinish}
              className={classNames('auth-form', authStyles.form)}
            >
              <Form.Item
                label={_('Email')}
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                  },
                ]}
                validateStatus={
                  formErrors.email || formErrors.non_field_errors
                    ? 'error'
                    : undefined
                }
                help={formErrors.email || formErrors.non_field_errors}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder={_(
                    'Please ensure you use your work email address',
                  )}
                  value={formData.email}
                  onChange={(e) => {
                    changeFormData({
                      ...formData,
                      email: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <Link
                className={authStyles.resetPassword}
                to={CLIENT_URLS.AUTH.RESET_PASSWORD.INDEX.buildPath()}
              >
                {_('Forgot password?')}
              </Link>
              <Form.Item
                label={_('Password')}
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
                validateStatus={formErrors.password ? 'error' : undefined}
                help={formErrors.password}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder={_('Password')}
                  value={formData.password}
                  onChange={(e) => {
                    changeFormData({
                      ...formData,
                      password: e.target.value,
                    });
                  }}
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

export default SignIn;
