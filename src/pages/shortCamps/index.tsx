import { Suspense } from 'react';
import { Await } from 'react-router';
import { CallMe } from '../../templates/callme';
import { CampInfoIcons } from './campInfoIcons';
import { CampsList } from './campsList';
import { ICampItem } from './interfaces';
import { loaderPageShortCamps } from './loaders';

export async function clientLoader() {
  return await loaderPageShortCamps();
}

export default function ShortCamps({
  loaderData,
}: {
  loaderData: {
    shortCamps: ICampItem[];
  };
}) {
  return (
    <Suspense fallback={'Загрузка...'}>
      <Await resolve={loaderData.shortCamps}>
        <div>
          <h2>Кемпы выходного дня</h2>
          <CampInfoIcons />

          <CampsList />

          <CallMe />
        </div>
      </Await>
    </Suspense>
  );
};
