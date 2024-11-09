import { defer } from 'react-router-dom';
import { getCoachesAll } from '../../api';
import { ICoachExt } from '../main/interfaces';

const loaderCoaches = async () => {
  const {
    data: { result, error },
  } = await getCoachesAll<ICoachExt>();
  return { coaches: result, error };
};

export const loaderPageCoaches = async () => {
  return defer({ coaches: loaderCoaches() });
};
