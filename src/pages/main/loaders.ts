import {
  getMediaAll,
  getCampsAll,
  getCoachesAll,
  getQuestionAll,
} from '../../api';
import { IMedia, ICamp, ICoachExt, IQuestion } from './interfaces';

const loaderMedia = async () => {
  const {
    data: { result, error },
  } = await getMediaAll<IMedia>();
  return { medias: result, error };
};
const loaderCamps = async () => {
  const {
    data: { result, error },
  } = await getCampsAll<ICamp>();
  return { camps: result, error };
};
const loaderCoaches = async () => {
  const {
    data: { result, error },
  } = await getCoachesAll<ICoachExt>();
  return { coaches: result, error };
};

const loaderQuestions = async () => {
  const {
    data: { result, error },
  } = await getQuestionAll<IQuestion>();
  return { questions: result, error };
};

export const loaderPageMain = async () => {
  const [medias, coches, camps, questions] = await Promise.all([
    loaderMedia(),
    loaderCoaches(),
    loaderCamps(),
    loaderQuestions(),
  ]);
  const main = {
    ...medias,
    ...coches,
    ...camps,
    ...questions,
  };
  return { main };
};
