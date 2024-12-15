import { Suspense } from 'react';
import { Await } from 'react-router';
import { IAbout } from './interfaces';
import { Info } from './info';
import { Activities } from './activities';
import { Master } from './master';
import { Videos } from './videos';
import { Reviews } from './reviews';
import { loaderPageAbout } from './loaders';
import { Route } from './+types';

export async function clientLoader() {
  return await loaderPageAbout();
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
