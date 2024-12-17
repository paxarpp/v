import { pl } from '../../api';
import { ICampItem } from './interfaces';

const loaderLongCamps = async () => {
  const {
    data: { result, error },
  } = await pl.getLongCamps<ICampItem>();
  return { longCamps: result, error };
};

export const loaderPageLongCamps = async () => {
  return await loaderLongCamps();
};
