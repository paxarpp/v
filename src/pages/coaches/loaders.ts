import { getCoachesAll } from "../../api";
import { ICoachExt } from "../main/interfaces";

const loaderCoaches = async () => {
  const { data: { result }} = await getCoachesAll<ICoachExt>();
  return { coaches: result };
}

export const loaderPageCoaches = async () => {
  const coches = await loaderCoaches();
  const main = {
    ...coches,
  };
  return { main }
};