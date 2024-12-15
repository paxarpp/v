import { getCorporates } from '../../api';

const loaderCorporates = async () => {
  const {
    data: { result, error },
  } = await getCorporates();
  return { corporates: result, error };
};

export const loaderPageCorporates = async () => {
  return await loaderCorporates();
};
