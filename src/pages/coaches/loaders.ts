import { pl } from '../../api';
import { ICoach } from './interfaces';

const loaderBeachCoaches = async () => {
  const {
    data: { result, error },
  } = await pl.getBeachCoachesAll<ICoach>();
  return { coaches: result, error };
};

export const loaderPageBeachCoaches = async () => {
  return await loaderBeachCoaches();
};

const loaderClassicCoaches = async () => {
  const {
    data: { result, error },
  } = await pl.getClassicCoachesAll<ICoach>();
  return { coaches: result, error };
};

export const loaderPageClassicCoaches = async () => {
  return await loaderClassicCoaches();
};
