import url from 'utils/routes';

const SERVER_URLS = {
  SIGN_IN: url('/api/v1/users/signin/'),
  SIGN_IN_2FA: url('/api/v1/users/signin/2fa/'),
  SIGN_OUT: url('/api/v1/users/signout/'),
  RESET_PASSWORD_SEND_EMAIL_VERIFICATION: url('/api/v1/users/password/'),
  RESET_PASSWORD_PASSWORD: url(
    '/api/v1/users/password/verify/:resetPasswordCode/',
  ),

  USER_VERIFY: url('/api/v1/users/profile/'),

  IMAGE_CREATE: url('/api/v1/storage/image/create/'),
};

export default SERVER_URLS;
