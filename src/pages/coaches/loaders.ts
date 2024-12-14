import { getBeachCoachesAll, getClassicCoachesAll } from '../../api';
import { ICoach } from './interfaces';

const loaderBeachCoaches = async () => {
  const {
    data: { result, error },
  } = await getBeachCoachesAll<ICoach>();
  return { coaches: result, error };
};

export const loaderPageBeachCoaches = async () => {
  return { coaches: loaderBeachCoaches() };
};

const loaderClassicCoaches = async () => {
  const {
    data: { result, error },
  } = await getClassicCoachesAll<ICoach>();
  return { coaches: result, error };
};

export const loaderPageClassicCoaches = async () => {
  return { coaches: loaderClassicCoaches() };
};
