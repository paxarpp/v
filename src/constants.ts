import { HOST } from './api';

export const createLinkTg = (link?: string) => {
  return link
    ? link[0] === '@'
      ? `tg://resolve?domain=${link.slice(1)}`
      : link
    : 'https://t.me/magicvolleyrz';
};

export const createImageUrl = (url?: string) => {
  return url ? `${HOST}${url}` : '';
};
