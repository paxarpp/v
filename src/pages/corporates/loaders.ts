import { pl } from '../../api';

const loaderCorporates = async () => {
  const {
    data: { result, error },
  } = await pl.getCorporates();
  return { corporates: result, error };
};

export const loaderPageCorporates = async () => {
  return await loaderCorporates();
};
