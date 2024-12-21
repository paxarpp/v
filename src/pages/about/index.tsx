import { Suspense } from 'react';
import { Await } from 'react-router';
import { Info } from './info';
import { Activities } from './activities';
import { Master } from './master';
import { Videos } from './videos';
import { Reviews } from './reviews';
import { Route } from './+types';
import { pl } from '../../api';
import { IAbout } from './interfaces';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getAbout<IAbout>();
  return { about: result, error };
}

export default function About({ loaderData }: Route.ComponentProps) {
  return (
    <Suspense fallback={'Загрузка...'}>
      <Await resolve={loaderData.about}>
        <Info />

        <Activities />

        <Master />

        <Videos />

        <Reviews />
      </Await>
    </Suspense>
  );
}
