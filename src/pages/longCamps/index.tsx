import { Suspense } from 'react';
import { Await } from 'react-router';
import { CallMe } from '../../templates/callme';
import { ICampItem } from './interfaces';
import { CampInfoIcons } from './campInfoIcons';
import { CampsList } from './campsList';
import { loaderPageLongCamps } from './loaders';

export async function clientLoader() {
  return await loaderPageLongCamps();
}

export default function LongCamps({
  loaderData,
}: {
  loaderData: {
    longCamps: ICampItem[];
  };
}) {
  return (
    <Suspense fallback={'Загрузка...'}>
      <Await resolve={loaderData.longCamps}>
        <div>
          <h2>Недельные кемпы</h2>

          <CampInfoIcons />

          <CampsList />

          <CallMe />
        </div>
      </Await>
    </Suspense>
  );
}
