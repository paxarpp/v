import { Suspense } from 'react';
import { Await } from 'react-router';
import { CallMe } from '../../templates/callme';
import { CampsList } from './campsList';
import { Route } from './+types';
import { ICampItem } from './interfaces';
import { pl } from '../../api';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getPastCamps<ICampItem>();
  return { pastCamps: result, error };
}

export default function PastCamps({ loaderData }: Route.ComponentProps) {
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
