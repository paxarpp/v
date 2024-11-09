import { Await, useAsyncValue, useLoaderData } from 'react-router-dom';
import { IPrice } from '../interfaces';
import { ErrorLocal } from '../../../templates/errorLocal';
import styles from '../index.module.css';
import { Suspense } from 'react';

export const Price = () => {
  const { prices, error } = useLoaderData() as {
    prices: IPrice[];
    error?: string;
  };

  return (
    <div className={styles.price_ball}>
      <h1 className={styles.price_title}>Стоимость тренировок</h1>
      {error ? (
        <ErrorLocal error={error} />
      ) : (
        <Suspense fallback={'Загрузка...'}>
          <Await resolve={prices}>
            <PriceTemplate />
          </Await>
        </Suspense>
      )}
    </div>
  );
};

const PriceTemplate = () => {
  const { prices } = useAsyncValue() as {
    prices: IPrice[];
  };
  return (
    <div className={styles.price_list}>
      {prices.map((pr) => {
        return (
          <div key={pr.id} className={styles.price_item}>
            {pr.name}
            <div className={styles.price_prices}>
              {pr.prices.map((p) => {
                return (
                  <div key={p.id} className={styles.price_card}>
                    <span>{p.title}</span>
                    {p.subTitle ? (
                      <span className={styles.price_message}>{p.subTitle}</span>
                    ) : (
                      <span className={styles.price_message_empty} />
                    )}
                    <span>{p.price}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
