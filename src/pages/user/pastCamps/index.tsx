import { useLoaderData } from 'react-router';
import { IUser } from '../interfaces';
import { Scroller } from '../scroller';

export const PastCamps = () => {
  const { user } = useLoaderData<{
    user: IUser;
  }>();

  return user.isAdmin ? null : (
    <Scroller title={'Мои прошедшие кемпы'} camps={user.pastCamps} />
  );
};
