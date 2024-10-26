import {
  useLoaderData,
} from "react-router-dom";
import { IPrice } from "../interfaces";
import styles from '../index.module.css';
import { ErrorLocal } from "../../../templates/errorLocal";

export const Price = () => {
  const { shedule } = useLoaderData() as {
    shedule: {
      price: {
        result: IPrice[],
        error?: string
      },
    }
  };
  return (
    <div className={styles.price_ball}>
      <h1 className={styles.price_title}>Стоимость тренировок</h1>
      {shedule.price.error ? (<ErrorLocal error={shedule.price.error} />) : (
        <div className={styles.price_list}>
          {shedule.price.result.map((pr) => {
            return (
              <div key={pr.id} className={styles.price_item}>
                {pr.name}
                <div  className={styles.price_prices}>
                  {pr.prices.map((p) => {
                    return (
                      <div key={p.id} className={styles.price_card}>
                        <span>{p.title}</span>
                        {p.subTitle ? (<span className={styles.price_message}>{p.subTitle}</span>) : (
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
      )}
    </div>
  );
};