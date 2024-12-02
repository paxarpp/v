import { getAppInfo } from '../api';

const loaderApp = async () => {
  const {
    data: { result, error },
  } = await getAppInfo();
  return { app: result, error };
};

export const loaderAppInfo = async () => {
  return { app: loaderApp() };
};
