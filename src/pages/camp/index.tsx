import { Suspense } from 'react';
import { Await } from 'react-router';
import { ICampItem } from './interfaces';
import { CallMe } from '../../templates/callme';
import { MainImage } from './mainImage';
import { Info } from './info';
import { Packages } from './packages';
import { Coaches } from './coaches';
import { Users } from './users';
import { loaderPageCamp } from './loaders';

export async function clientLoader({ params: { id }}) {
  return await loaderPageCamp(id);
}

export default function Camp({
  loaderData,
}: {
  loaderData: {
    camp: ICampItem[];
  };
}) {
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
