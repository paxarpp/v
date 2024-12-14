import { Suspense } from 'react';
import { Await } from 'react-router';
import { CallMe } from '../../templates/callme';
import { CampsList } from './campsList';
import { loaderPagePastCamps } from './loaders';
import { ICampItem } from './interfaces';

export async function clientLoader() {
  return await loaderPagePastCamps();
}

export default function PastCamps({
  loaderData,
}: {
  loaderData: {
    pastCamps: ICampItem[];
  };
}) {
  return (
    <div>
      <h2>Прошедшие кемпы</h2>
      <Suspense fallback={'Загрузка...'}>
        <Await resolve={loaderData.pastCamps}>
          <CampsList />

          <CallMe />
        </Await>
      </Suspense>
    </div>
  );
}
