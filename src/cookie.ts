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
