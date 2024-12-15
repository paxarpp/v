import { Suspense } from 'react';
import { CoachesList } from './coachesList';
import { loaderPageClassicCoaches } from './loaders';
import { Await } from 'react-router';
import { CoachesSkeleton } from './skeleton';
import { Route } from './+types';
import styles from './index.module.css';

export async function clientLoader() {
  return await loaderPageClassicCoaches();
}

export default function Coaches({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1 className={styles.title}>
        Тренерский состав в школе волейбола Magic Volley
      </h1>
      <Suspense fallback={<CoachesSkeleton />}>
        <Await resolve={loaderData.coaches}>
          <CoachesList />
        </Await>
      </Suspense>
    </div>
  );
}
