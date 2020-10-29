/**
 * handle Errors
 */
export const handleErrors = (errors, options) => {
  const opts = options || {};
  const history = opts.history;
  const callback = opts.callback;
  switch (errors.status) {
    case 400:
      if (!history && callback && errors.data) {
        callback(errors.data);
      }
      break;
    case 403:
      // if (history) { history.push("/403/"); }
      break;
    case 404:
      if (history) {
        history.push('/404/');
      }
      break;
    default:
      break;
  }
};
