import { getCampsAll, getQuestionAll, getHome } from '../../api';
import { ICamp, IHome, IQuestion } from './interfaces';

const loaderCamps = async () => {
  const {
    data: { result, error },
  } = await getCampsAll<ICamp>();
  return { camps: result, error };
};

const loaderQuestions = async () => {
  const {
    data: { result, error },
  } = await getQuestionAll<IQuestion>();
  return { questions: result, error };
};

const loaderHome = async () => {
  const {
    data: { result, error },
  } = await getHome<IHome>();
  return { home: result, error };
};

export const loaderPageMain = async () => {
  return {
    home: loaderHome(),
  };
};
