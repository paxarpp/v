import { pl } from '../api';

const loaderApp = async () => {
  const {
    data: { result, error },
  } = await pl.getAppInfo();
  return { app: result, error };
};

export const loaderAppInfo = async () => {
  return await loaderApp();
};
