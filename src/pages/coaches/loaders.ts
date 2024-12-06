import { defer } from 'react-router-dom';
import { getBeachCoachesAll, getClassicCoachesAll } from '../../api';
import { ICoach } from './interfaces';

const loaderBeachCoaches = async () => {
  const {
    data: { result, error },
  } = await getBeachCoachesAll<ICoach>();
  return { coaches: result, error };
};

export const loaderPageBeachCoaches = async () => {
  return defer({ coaches: loaderBeachCoaches() });
};

const loaderClassicCoaches = async () => {
  const {
    data: { result, error },
  } = await getClassicCoachesAll<ICoach>();
  return { coaches: result, error };
};

export const loaderPageClassicCoaches = async () => {
  return defer({ coaches: loaderClassicCoaches() });
};
