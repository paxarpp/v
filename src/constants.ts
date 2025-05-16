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

export const pattern =
  /([\+]?[7|8][\s-(]?[9][0-9]{2}[\s-)]?)?([\d]{3})[\s-]?([\d]{2})[\s-]?([\d]{2})/;

export const PHONE_MASK = '+7(XXX)-XXX-XX-XX';

export const applyMask = (numbers: string): string => {
  let formatted = PHONE_MASK;
  for (let i = 0; i < numbers.length && i < 10; i++) {
    const digit = numbers[i];
    const position = formatted.indexOf('X');
    if (position !== -1) {
      formatted =
        formatted.substring(0, position) +
        digit +
        formatted.substring(position + 1);
    }
  }
  return formatted;
};
