import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';
import { Days } from './days';
import { ErrorLocal } from '../../../templates/errorLocal';
import { Route } from '../+types';
import styles from '../index.module.css';

const weekDays = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
] as const;

export const SheduleTable = () => {
  const [{ trainingShedule, error }] =
    useLoaderData<Route.ComponentProps['loaderData']>();

  return (
    <div className={styles.shedule_table}>
      <Days />
      {error ? (
        <ErrorLocal error={error} />
      ) : (
        <Suspense fallback={<SheduleSkeleton />}>
          <Await resolve={trainingShedule}>
            <SheduleeTemplate />
          </Await>
        </Suspense>
      )}
    </div>
  );
};

const SheduleSkeleton = () => {
  return (
    <div className={styles.group}>
      <div className={styles.group_name}>{'Загрузка...'}</div>
      {weekDays.map((dayName) => {
        return (
          <div key={dayName} className={styles.group_day}>
            <div className={styles.empty_day} />
          </div>
        );
      })}
    </div>
  );
};

const SheduleeTemplate = () => {
  const [{ trainingShedule }] =
    useLoaderData<Route.ComponentProps['loaderData']>();
  return (
    <>
      {trainingShedule.map((group) => {
        return (
          <div key={group.id} className={styles.group}>
            <div className={styles.group_name}>{group.name}</div>
            {weekDays.map((dayName) => {
              const day = group.days.find((d) => d.id === dayName);
              return day ? (
                <div key={group.id + day.id} className={styles.group_day}>
                  <span>{day.time}</span>
                  <span>{day.address}</span>
                </div>
              ) : (
                <div key={group.id + dayName} className={styles.group_day}>
                  <div className={styles.empty_day} />
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};
