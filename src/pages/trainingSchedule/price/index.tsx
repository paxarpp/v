import { Suspense } from 'react';
import { Await, useAsyncValue, useLoaderData } from 'react-router-dom';
import { IPrice } from '../interfaces';
import { ErrorLocal } from '../../../templates/errorLocal';
import Ball from '../../../assets/ball.svg?react';
import styles from '../index.module.css';

export const Price = () => {
  const { prices, error } = useLoaderData() as {
    prices: IPrice[];
    error?: string;
  };

  return (
    <div className={styles.price_ball}>
      <h1 className={styles.price_title}>Стоимость тренировок</h1>
      <img className={styles.price_back} src={'src/assets/price_ball.jpg'} />
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
            <p>{pr.name}</p>
            <div className={styles.price_prices}>
              {pr.prices.map((p, index) => {
                return (
                  <>
                    <div key={p.id} className={styles.price_card}>
                      <span>{p.title}</span>
                      {p.subTitle ? (
                        <span className={styles.price_message}>
                          {p.subTitle}
                        </span>
                      ) : (
                        <span className={styles.price_message_empty} />
                      )}
                      <span>{p.price}</span>
                    </div>
                    {index === 0 ? <Ball /> : null}
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
