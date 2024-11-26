import { defer } from 'react-router-dom';
import { getShortCamps } from '../../api';
import { ICampItem } from './interfaces';

const loaderShortCamps = async () => {
  const {
    data: { result, error },
  } = await getShortCamps<ICampItem>();
  return { shortCamps: result, error };
};

export const loaderPageShortCamps = async () => {
  return defer({ shortCamps: loaderShortCamps() });
};
