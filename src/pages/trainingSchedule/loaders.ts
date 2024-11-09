import { defer } from 'react-router-dom';
import { getShedule, getPrice } from '../../api';
import { IPrice, IShedule } from './interfaces';

const loaderShedule = async () => {
  const {
    data: { result, error },
  } = await getShedule<IShedule>();
  return { trainingShedule: result, error };
};
const loaderPrice = async () => {
  const {
    data: { result, error },
  } = await getPrice<IPrice>();
  return { prices: result, error };
};

export const loaderPageShedule = async () => {
  return defer({ trainingShedule: loaderShedule(), prices: loaderPrice() });
};
