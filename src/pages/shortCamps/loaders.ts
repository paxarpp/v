import { getShortCamps } from '../../api';
import { ICampItem } from './interfaces';

const loaderShortCamps = async () => {
  const {
    data: { result, error },
  } = await getShortCamps<ICampItem>();
  return { shortCamps: result, error };
};

export const loaderPageShortCamps = async () => {
  return { shortCamps: loaderShortCamps() };
};
