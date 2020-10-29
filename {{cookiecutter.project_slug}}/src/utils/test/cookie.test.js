import { getCookie } from 'utils/cookie';

it('test cookie.js', () => {
  const csrftoken = '123';
  const sessionid = '321';
  const cookie = `csrftoken=${csrftoken};sessionid=${sessionid}`;
  Object.defineProperty(document, 'cookie', {
    get: jest.fn().mockImplementation(() => {
      return cookie;
    }),
  });
  expect(getCookie('csrftoken')).toEqual(csrftoken);
  expect(getCookie('sessionid')).toEqual(sessionid);
});
