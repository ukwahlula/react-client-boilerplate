import url from 'utils/routes';

const CLIENT_URLS = {
  INDEX: url('/'),
  AUTH: {
    INDEX: url('/auth/'),
    SIGN_IN: url('/auth/sign-in/'),
    SIGN_IN_2FA: url('/auth/sign-in/2fa/'),
    RESET_PASSWORD: {
      INDEX: url('/auth/reset-password/'),
      SEND_EMAIL_VERIFICATION: url(
        '/auth/reset-password/send-email-verification/',
      ),
      PASSWORD: url('/auth/reset-password/password/'),
    },
  },
  MAIN: {
    INDEX: url('/main/'),
  },
  NOT_FOUND: url('*'),
};

export default CLIENT_URLS;
