import { getMediaAll, getCampsAll, getCoachesAll, getQuestionAll } from "../../api";
import { IMedia, ICamp, ICoachExt, IQuestion } from "./interfaces";

export const loaderMedia = async () => {
  const { data: { result }} = await getMediaAll<IMedia>();
  return { medias: result };
}
export const loaderCamps = async () => {
  const { data: { result }} = await getCampsAll<ICamp>();
  return { camps: result };
}
export const loaderCoaches = async () => {
  const { data: { result }} = await getCoachesAll<ICoachExt>();
  return { coaches: result };
}

export const loaderQuestions = async () => {
  const { data: { result }} = await getQuestionAll<IQuestion>();
  return { questions: result };
}