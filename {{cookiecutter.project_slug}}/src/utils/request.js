import { getCookie } from 'utils/cookie';

export const requestOptions = () => {
  const headers = {};
  const csrftoken = getCookie('csrftoken');
  if (csrftoken) {
    headers['X-CSRFToken'] = csrftoken;
  }
  headers['Access-Control-Allow-Origin'] = '*';

  return { headers, credentials: 'include' };
};

export const uploadRequest = async (name, file, url, onSuccess, onError) => {
  const uploadUrl = process.env.REACT_APP_API_SERVER.slice(0, -1) + url;
  const formData = new FormData();
  formData.append(name, file);
  const response = await fetch(uploadUrl, {
    method: 'POST',
    ...requestOptions(),
    body: formData,
  });
  const data = await response.json();
  if (response.status === 200 || response.status === 201) {
    onSuccess(data);
  } else {
    onError(data);
  }
};
