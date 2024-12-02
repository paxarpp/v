import { defer } from 'react-router-dom';
import { getAbout } from '../../api';
import { IAbout } from './interfaces';

const loaderAbout = async () => {
  const {
    data: { result, error },
  } = await getAbout<IAbout>();
  return { about: result, error };
};

export const loaderPageAbout = async () => {
  return defer({ about: loaderAbout() });
};
