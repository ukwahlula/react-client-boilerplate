import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import { Row, Col, Form, Input, Button, Layout, Alert } from 'antd';
import { RightCircleOutlined, MailOutlined } from '@ant-design/icons';
import { useMutate } from 'restful-react';

import { _ } from 'utils/trans';

import SERVER_URLS from 'routes/server';

import authStyles from 'containers/Auth/index.module.scss';

const { Content } = Layout;

const SendVerificationEmail = () => {
  const [success, changeSuccess] = useState(false);
  const defaultFormData = {
    email: '',
  };
  const [formData, changeFormData] = useState(defaultFormData);
  const [formErrors, changeFormErrors] = useState({});
  const { mutate, loading } = useMutate({
    verb: 'POST',
    path: SERVER_URLS.RESET_PASSWORD_SEND_EMAIL_VERIFICATION.buildPath(),
  });

  const onFinish = async () => {
    try {
      await mutate(formData);
      changeSuccess(true);
      changeFormData(defaultFormData);
      changeFormErrors({});
    } catch (errors) {
      if (errors.status === 400) {
        changeSuccess(false);
        changeFormErrors(errors.data);
      }
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{_('Reset password')}</title>
        <meta name="description" content={_('Reset password')} />
      </Helmet>
      <Content className={authStyles.content}>
        <Row justify="center">
          <Col xs={20} sm={20} md={10} lg={10} xl={8}>
            <div className={authStyles.title}>{_('Reset password')}</div>

            {success && (
              <Alert
                message={_(
                  'We sent reset password link to your email address. Check your email and follow the instructions.',
                )}
                type="success"
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
                label={_('Email')}
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                  },
                ]}
                validateStatus={formErrors.name ? 'error' : undefined}
                help={formErrors.name}
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
              <Button
                htmlType="submit"
                loading={loading}
                className={authStyles.submitBtn}
              >
                <RightCircleOutlined /> {_('Send')}
              </Button>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default SendVerificationEmail;
