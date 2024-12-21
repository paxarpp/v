import { useEffect } from 'react';
import { useUser } from '../../context';
import { Info } from './info';
import { NearestCamps } from './nearestCamps';
import { PastCamps } from './pastCamps';
import { Users } from './users';
import { ProtectedRoute } from '../../templates/protectedRoute';
import { Route } from './+types';
import { IUser } from './interfaces';
import { pl } from '../../api/pageLoader';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader({ params: { id } }: Route.ClientLoaderArgs) {
  const {
    data: { result, error },
  } = await pl.getUser<IUser>(id);
  return { user: result, error };
}

export default function User({ loaderData }: Route.ComponentProps) {
  const { logout } = useUser();

  useEffect(() => {
    if (loaderData?.error) {
      logout();
    }
  }, [loaderData?.error]);

  return (
    <ProtectedRoute>
      <Info />

      <NearestCamps />

      <PastCamps />

      <Users />
    </ProtectedRoute>
  );
}
