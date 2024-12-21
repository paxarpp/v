import { Suspense } from 'react';
import { Await } from 'react-router';
import { CallMe } from '../../templates/callme';
import { CampInfoIcons } from './campInfoIcons';
import { CampsList } from './campsList';
import { Route } from './+types';
import { ICampItem } from './interfaces';
import { pl } from '../../api';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getLongCamps<ICampItem>();
  return { longCamps: result, error };
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
