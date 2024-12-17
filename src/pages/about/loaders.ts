import { pl } from '../../api';
import { IAbout } from './interfaces';

const loaderAbout = async () => {
  const {
    data: { result, error },
  } = await pl.getAbout<IAbout>();
  return { about: result, error };
};

export const loaderPageAbout = async () => {
  return await loaderAbout();
};
