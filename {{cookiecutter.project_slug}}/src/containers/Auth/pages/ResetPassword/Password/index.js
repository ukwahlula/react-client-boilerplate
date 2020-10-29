import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import { Row, Col, Form, Input, Button, Layout, Alert } from 'antd';
import { LockOutlined, SaveOutlined } from '@ant-design/icons';
import { useMutate } from 'restful-react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { _ } from 'utils/trans';

import CLIENT_URLS from 'routes/client';
import SERVER_URLS from 'routes/server';

import authStyles from 'containers/Auth/index.module.scss';

const { Content } = Layout;

const Password = () => {
  const history = useHistory();
  const location = useLocation();
  const getParams = queryString.parse(location.search);

  const resetPasswordCode = getParams.code;
  const [formData, changeFormData] = useState({
    password: '',
    repeat_password: '',
  });
  const [formErrors, changeFormErrors] = useState({});
  const { mutate, loading, error } = useMutate({
    verb: 'PATCH',
    path: SERVER_URLS.RESET_PASSWORD_PASSWORD.buildPath({
      resetPasswordCode: resetPasswordCode || 'loading',
    }),
  });

  const onFinish = async () => {
    try {
      await mutate(formData);
      changeFormErrors({});
      history.push(
        CLIENT_URLS.AUTH.SIGN_IN.buildPath({
          queryParams: { success_reset_password: true },
        }),
      );
    } catch (errors) {
      if (errors.status === 400) {
        changeFormErrors(errors.data);
      }
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{_('Reset Password')}</title>
        <meta name="description" content={_('Reset Password')} />
      </Helmet>
      <Content className={authStyles.content}>
        <Row justify="center">
          <Col xs={20} sm={20} md={10} lg={10} xl={8}>
            <div className={authStyles.title}>{_('Reset password')}</div>
            {error && (
              <Alert
                message={_(
                  'Invalid reset password link. Check your email and follow the instructions or contact with us.',
                )}
                type="error"
                className={authStyles.alert}
              />
            )}
            <Form
              layout="vertical"
              onFinish={onFinish}
              className={classNames('auth-form', authStyles.form)}
            >
              {formErrors.non_field_errors && (
                <Form.Item
                  validateStatus={
                    formErrors.non_field_errors ? 'error' : undefined
                  }
                  help={formErrors.non_field_errors}
                />
              )}
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
              <Form.Item
                label={_('Repeat password')}
                name="repeat_password"
                rules={[
                  {
                    required: true,
                  },
                ]}
                validateStatus={
                  formErrors.repeat_password ? 'error' : undefined
                }
                help={formErrors.repeat_password}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="repeat_password"
                  placeholder={_('Repeat password')}
                  value={formData.repeat_password}
                  onChange={(e) => {
                    changeFormData({
                      ...formData,
                      repeat_password: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <Button
                htmlType="submit"
                loading={loading}
                className={authStyles.submitBtn}
              >
                <SaveOutlined /> {_('Reset')}
              </Button>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Password;
