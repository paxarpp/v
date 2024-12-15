import { Suspense } from 'react';
import { Await } from 'react-router';
import { CallMe } from '../../templates/callme';
import { CampInfoIcons } from './campInfoIcons';
import { CampsList } from './campsList';
import { loaderPageLongCamps } from './loaders';
import { Route } from './+types';

export async function clientLoader() {
  return await loaderPageLongCamps();
}

export default function LongCamps({ loaderData }: Route.ComponentProps) {
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
