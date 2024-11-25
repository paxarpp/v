import { useAsyncValue } from 'react-router-dom';
import People from '../../../assets/people.svg?react';
import Tour from '../../../assets/tour.svg?react';
import { ICampItem } from '../../shotCamps/interfaces';
import styles from '../index.module.css';

export const Packages = () => {
  const { camp } = useAsyncValue() as {
    camp: ICampItem;
  };

  return (
    <div className={styles.column}>
      <h2>{'Что входит в стоимость'}</h2>

      <div className={styles.package_row}>
        {camp.packages?.map((pack) => (
          <div key={pack.packageId} className={styles.pack_card}>
            <img src={'/src/assets/pack_back.jpg'} alt={pack.name} className={styles.back_card} />
            {pack.name.toLocaleLowerCase().includes('tur') ? (
              <Tour className={styles.pack_icon} />
            ) : (
              <People className={styles.pack_icon} />
            )}
            <h4 className={styles.pack_title}>{`Пакет "${pack.name}"`}</h4>
            <ul className={styles.pack_info}>
              {pack.info
                .split(';')
                .filter(Boolean)
                .map((inf, i) => (
                  <li key={i + 'pack'}>{inf}</li>
                ))}
            </ul>
            <h4 className={styles.total_price}>{`${pack.totalPrice} ₽*`}</h4>
            <span
              className={styles.cost_link}
            >{`*${pack.costNamingLink}`}</span>
            <span
              className={styles.booking_price}
            >{`предоплата по спорт пакету - ${pack.bookingPrice} ₽`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
