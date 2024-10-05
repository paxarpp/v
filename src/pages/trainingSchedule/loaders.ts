import { getShedule, getPrice } from "../../api";
import { IPrice, IShedule } from "./interfaces";

const loaderShedule = async () => {
  const { data: { result }} = await getShedule<IShedule>();
  return { trainingShedule: result };
}
const loaderPrice = async () => {
  const { data: { result }} = await getPrice<IPrice>();
  return { price: result };
}

export const loaderPageShedule = async () => {
  const  [trainingShedule, price] =
  await Promise.all([loaderShedule(), loaderPrice()]);
const shedule = {
  ...trainingShedule,
  ...price,
};
return { shedule }
};