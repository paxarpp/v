import { Suspense } from 'react';
import { useLoaderData, Await, useAsyncValue } from 'react-router-dom';
import { CallMe } from '../../templates/callme';
import { ErrorLocal } from '../../templates/errorLocal';
import { Footer } from '../../templates/footer';
import { IShortCamp } from './interfaces';
import { CampInfoIcons } from './campInfoIcons';
import styles from './index.module.css';

export const ShotCamp = () => {
  const { shortCamps, error } = useLoaderData() as {
    shortCamps: IShortCamp[];
    error?: string;
  };
  return (
    <div>
      <h2>Кемпы выходного дня</h2>

      <CampInfoIcons />

      <div>
        {error ? (
          <ErrorLocal error={error} />
        ) : (
          <Suspense fallback={'Загрузка...'}>
            <Await resolve={shortCamps}>
              <CampsTemplate />
            </Await>
          </Suspense>
        )}
      </div>

      <CallMe />

      <Footer />
    </div>
  );
};

const CampsTemplate = () => {
  const { shortCamps } = useAsyncValue() as {
    shortCamps: IShortCamp[];
  };
  return (
    <div className={styles.camp_list}>
      {shortCamps.map((camp) => {
        return (
          <div key={camp.id} className={styles.camp_card}>
            <div>
              <h2>
                {camp.dateStart}-{camp.dateEnd}
              </h2>
              <span>{camp.name}</span>
            </div>
            <div>тут картинка</div>
            <div>
              <button>Подробнее</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
