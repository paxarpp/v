import { defer } from 'react-router-dom';
import { getCamp } from '../../api';
import { ICampItem } from '../shotCamps/interfaces';

const loaderCamp = async (id: string) => {
  const {
    data: { result, error },
  } = await getCamp<ICampItem>(id);
  return { shortCamp: result, error };
};

export const loaderPageCamp = async ({ params: { id }}: any) => {
  return defer({ shortCamp: loaderCamp(id) });
};
