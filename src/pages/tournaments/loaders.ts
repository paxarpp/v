import { getTournaments } from '../../api';

const loaderTournaments = async () => {
  const {
    data: { result, error },
  } = await getTournaments();
  return { tournaments: result, error };
};

export const loaderPageTournaments = async () => {
  return await loaderTournaments();
};
