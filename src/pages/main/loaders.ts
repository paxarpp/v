import { getHome } from '../../api';
import { IHome } from './interfaces';

const loaderHome = async () => {
  const {
    data: { result, error },
  } = await getHome<IHome>();
  return { home: result, error };
};

export const loaderPageMain = async () => {
  return await loaderHome();
};
