import { getPastCamps } from '../../api';
import { ICampItem } from './interfaces';

const loaderPastCamps = async () => {
  const {
    data: { result, error },
  } = await getPastCamps<ICampItem>();
  return { pastCamps: result, error };
};

export const loaderPagePastCamps = async () => {
  return await loaderPastCamps();
};
