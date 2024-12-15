import { Suspense } from 'react';
import { Await } from 'react-router';
import { CallMe } from '../../templates/callme';
import { MainImage } from './mainImage';
import { Info } from './info';
import { Packages } from './packages';
import { Coaches } from './coaches';
import { Users } from './users';
import { loaderPageCamp } from './loaders';
import { Route } from './+types';

export async function clientLoader({ params: { id } }: Route.ClientLoaderArgs) {
  return await loaderPageCamp(id);
}

export default function Camp({ loaderData }: Route.ComponentProps) {
  return (
    <Suspense fallback={'Загрузка...'}>
      <Await resolve={loaderData.camp}>
        <>
          <MainImage />

          <Info />

          <Packages />

          <Coaches />

          <Users />

          <CallMe />
        </>
      </Await>
    </Suspense>
  );
}
