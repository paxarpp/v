import { Suspense } from 'react';
import { CoachesList } from './coachesList';
import { loaderPageBeachCoaches } from './loaders';
import { ICoach } from './interfaces';
import { CoachesSkeleton } from './skeleton';
import { Await } from 'react-router';
import styles from './index.module.css';

export async function clientLoader() {
  return await loaderPageBeachCoaches();
}

export default function Coaches({
  loaderData,
}: {
  loaderData: {
    coaches: ICoach[];
  };
}) {
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
