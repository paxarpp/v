import { Suspense, useEffect } from 'react';
import { Await, useLoaderData } from 'react-router';
import { useUser } from '../../context';
import { Info } from './info';
import { NearestCamps } from './nearestCamps';
import { PastCamps } from './pastCamps';
import { Users } from './users';
import { loaderPageUser } from './loaders';
import { ProtectedRoute } from '../../templates/protectedRoute';
import { Route } from './+types';

export async function clientLoader({ params: { id } }: Route.ClientLoaderArgs) {
  return await loaderPageUser(id);
}

export default function User({ loaderData }: Route.ComponentProps) {
  return (
    <ProtectedRoute>
      <Suspense fallback={'Загрузка...'}>
        <Await resolve={loaderData.user}>
          <UserTemplate />
        </Await>
      </Suspense>
    </ProtectedRoute>
  );
}

const UserTemplate = () => {
  const { error } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { logout } = useUser();

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error]);

  return (
    <>
      <Info />

      <NearestCamps />

      <PastCamps />

      <Users />
    </>
  );
};
