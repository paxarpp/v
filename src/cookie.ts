export const COOKIE_NAME = 'magicVolley';

export const getCookie = () => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        COOKIE_NAME.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  );
  return matches ? matches[1] : undefined;
};

export const setCookie = (cookieFull: string) => {
  document.cookie = cookieFull;
};

export const deleteCookie = () => {
  setCookie(`${COOKIE_NAME}=;max-age:-1`);
};
