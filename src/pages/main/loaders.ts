import { pl } from '../../api';
import { IHome } from './interfaces';

const loaderHome = async () => {
  const {
    data: { result, error },
  } = await pl.getHome<IHome>();
  return { home: result, error };
};

export const loaderPageMain = async () => {
  return await loaderHome();
};
