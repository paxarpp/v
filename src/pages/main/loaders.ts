import { getMediaAll, getCampsAll, getCoachesAll, getQuestionAll } from "../../api";
import { IMedia, ICamp, ICoachExt, IQuestion } from "./interfaces";

const loaderMedia = async () => {
  const { data: { result }} = await getMediaAll<IMedia>();
  return { medias: result };
}
const loaderCamps = async () => {
  const { data: { result }} = await getCampsAll<ICamp>();
  return { camps: result };
}
const loaderCoaches = async () => {
  const { data: { result }} = await getCoachesAll<ICoachExt>();
  return { coaches: result };
}

const loaderQuestions = async () => {
  const { data: { result }} = await getQuestionAll<IQuestion>();
  return { questions: result };
}

export const loaderPageMain = async () => {
  const [medias, coches, camps, questions] =
    await Promise.all([loaderMedia(), loaderCoaches(), loaderCamps(), loaderQuestions()]);
  const main = {
    ...medias,
    ...coches,
    ...camps,
    ...questions,
  };
  return { main }
};
