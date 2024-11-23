import { defer } from 'react-router-dom';
import { getShotCamps } from '../../api';
import { ICampItem } from './interfaces';

const loaderShortCamps = async () => {
  const {
    data: { result, error },
  } = await getShotCamps<ICampItem>();
  return { shortCamps: result, error };
};

export const loaderPageShotCamps = async () => {
  return defer({ shortCamps: loaderShortCamps() });
};
