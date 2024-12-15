import { useLoaderData } from 'react-router';
import { Route } from '../+types';
import { Scroller } from '../scroller';

export const PastCamps = () => {
  const { user } = useLoaderData<Route.ComponentProps['loaderData']>();

  return user.isAdmin ? null : (
    <Scroller title={'Мои прошедшие кемпы'} camps={user.pastCamps} />
  );
};
