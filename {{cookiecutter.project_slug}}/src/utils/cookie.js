/**
 * Get cookie by name
 * @param {string}
 */
export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    // eslint-disable-next-line
    for (const item of cookies) {
      const cookie = item.trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
