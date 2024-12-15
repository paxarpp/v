import { getCamp } from '../../api';
import { ICampItem } from './interfaces';

const loaderCamp = async (id: string) => {
  const {
    data: { result, error },
  } = await getCamp<ICampItem>(id);
  return { camp: result, error };
};

export const loaderPageCamp = async (id: string) => {
  return await loaderCamp(id);
};
