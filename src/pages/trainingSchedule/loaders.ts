import { getShedule, getPrice } from '../../api';
import { IPrice, IShedule } from './interfaces';

const loaderShedule = async () => {
  const {
    data: { result, error },
  } = await getShedule<IShedule>();
  return { trainingShedule: { result, error } };
};
const loaderPrice = async () => {
  const {
    data: { result, error },
  } = await getPrice<IPrice>();
  return { price: { result, error } };
};

export const loaderPageShedule = async () => {
  const [trainingShedule, price] = await Promise.all([loaderShedule(), loaderPrice()]);
  const shedule = {
    ...trainingShedule,
    ...price,
  };
  return { shedule };
};
