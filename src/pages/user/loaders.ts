import { defer } from 'react-router-dom';
import { getUser } from '../../api';
import { IUser } from './interfaces';

const loaderUser = async (id: string) => {
  const {
    data: { result, error },
  } = await getUser<IUser>(id);
  return { user: result, error };
};

export const loaderPageUser = async ({ params: { id }}: any) => {
  return defer({ user: loaderUser(id) });
};
