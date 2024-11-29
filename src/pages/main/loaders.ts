import { defer } from 'react-router-dom';
import { getCampsAll, getQuestionAll } from '../../api';
import { ICamp, IQuestion } from './interfaces';

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

export const loaderPageMain = async () => {
  return defer({
    camps: loaderCamps(),
    questions: loaderQuestions(),
  });
};
