import { useLoaderData } from 'react-router';
import { Route } from '../+types';
import { Scroller } from '../scroller';

export const NearestCamps = () => {
  const { user } = useLoaderData<Route.ComponentProps['loaderData']>();

  return user.isAdmin ? null : (
    <Scroller title={'Мои ближайшие кемпы'} camps={user.nearestCamps} />
  );
};
