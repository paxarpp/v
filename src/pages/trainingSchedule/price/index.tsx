import {
  useLoaderData,
} from "react-router-dom";
import { IPrice } from "../interfaces";
import styles from '../index.module.css';

export const Price = () => {
  const { shedule } = useLoaderData() as {
    shedule: {
      price: IPrice[],
    }
  };
  return (
    <div className={styles.price_ball}>
      <h1 className={styles.price_title}>Стоимость тренировок</h1>
      <div className={styles.price_list}>
        {shedule.price.map((pr) => {
          return (
            <div key={pr.id} className={styles.price_item}>
              {pr.name}
              <div  className={styles.price_prices}>
                {pr.prices.map((p) => {
                  return (
                    <div key={p.id} className={styles.price_card}>
                      <span>{p.name}</span>
                      {p.message ? (<span className={styles.price_message}>{p.message}</span>) : (
                        <span className={styles.price_message_empty} />
                      )}
                      <span>{p.price}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};