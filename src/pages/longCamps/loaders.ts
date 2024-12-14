import { getLongCamps } from '../../api';
import { ICampItem } from './interfaces';

const loaderLongCamps = async () => {
  const {
    data: { result, error },
  } = await getLongCamps<ICampItem>();
  return { longCamps: result, error };
};

export const loaderPageLongCamps = async () => {
  return { longCamps: loaderLongCamps() };
};
