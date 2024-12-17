import { pl } from '../../api';
import { IUser } from './interfaces';

const loaderUser = async (id: string) => {
  const {
    data: { result, error },
  } = await pl.getUser<IUser>(id);
  return { user: result, error };
};

export const loaderPageUser = async (id: string) => {
  return await loaderUser(id);
};
