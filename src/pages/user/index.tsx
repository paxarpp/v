import { Suspense, useEffect } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { logout as apiLogout } from '../../api';
import { useUser } from '../../context';
import { IUser } from './interfaces';
import { Info } from './info';
import { NearestCamps } from './nearestCamps';
import { PastCamps } from './pastCamps';
import { Users } from './users';

export const User = () => {
  const { user, error } = useLoaderData() as {
    user: IUser;
    error?: string;
  };
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
        <UserTemplate />
      </Await>
    </Suspense>
  );
};

const UserTemplate = () => {
  return (
    <>
      <Info />

      <NearestCamps />

      <PastCamps />

      <Users />
    </>
  );
};
