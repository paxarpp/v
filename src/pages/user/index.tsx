import { Suspense, useEffect } from 'react';
import { Await, useLoaderData } from 'react-router';
import { logout as apiLogout } from '../../api';
import { useUser } from '../../context';
import { IUser } from './interfaces';
import { Info } from './info';
import { NearestCamps } from './nearestCamps';
import { PastCamps } from './pastCamps';
import { Users } from './users';
import { loaderPageUser } from './loaders';
import { ProtectedRoute } from '../../templates/protectedRoute';

export async function clientLoader({ params: { id } }) {
  return await loaderPageUser(id);
}

export default function User() {
  return (
    <ProtectedRoute>
      <UserTemplate />
    </ProtectedRoute>
  );
}

const UserTemplate = () => {
  const { user, error } = useLoaderData<{
    user: IUser;
    error?: string;
  }>();
  const { logout } = useUser();

  useEffect(() => {
    if (error) {
      apiLogout();
      logout();
    }
  }, [error]);

  return (
    <Suspense fallback={'Загрузка...'}>
      <Await resolve={user}>
        <>
          <Info />

          <NearestCamps />

          <PastCamps />

          <Users />
        </>
      </Await>
    </Suspense>
  );
};
