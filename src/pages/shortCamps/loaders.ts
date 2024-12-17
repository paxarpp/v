import { pl } from '../../api';
import { ICampItem } from './interfaces';

const loaderShortCamps = async () => {
  const {
    data: { result, error },
  } = await pl.getShortCamps<ICampItem>();
  return { shortCamps: result, error };
};

export const loaderPageShortCamps = async () => {
  return await loaderShortCamps();
};
