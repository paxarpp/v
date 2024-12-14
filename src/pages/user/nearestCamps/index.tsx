import { useLoaderData } from 'react-router';
import { IUser } from '../interfaces';
import { Scroller } from '../scroller';

export const NearestCamps = () => {
  const { user } = useLoaderData<{
    user: IUser;
  }>();

  return user.isAdmin ? null : (
    <Scroller title={'Мои ближайшие кемпы'} camps={user.nearestCamps} />
  );
};
