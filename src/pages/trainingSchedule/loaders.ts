import { pl } from '../../api/pageLoader';
import { IPrice, IShedule } from './interfaces';

const loaderShedule = async () => {
  const {
    data: { result, error },
  } = await pl.getShedule<IShedule>();
  return { trainingShedule: result, error };
};
const loaderPrice = async () => {
  const {
    data: { result, error },
  } = await pl.getPrice<IPrice>();
  return { prices: result, error };
};

export const loaderPageShedule = async () => {
  return await Promise.all([loaderShedule(), loaderPrice()]);
};
