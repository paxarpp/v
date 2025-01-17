import { HOST } from './api';

export const createLinkTg = (link?: string) => {
  return link
    ? `tg://resolve?domain=${link[0] === '@' ? link.slice(1) : link}`
    : 'https://t.me/magicvolleyrz';
};

export const createImageUrl = (url?: string) => {
  return url ? `${HOST}${url}` : '';
};
