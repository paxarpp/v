import { useAsyncValue } from 'react-router-dom';
import People from '../../../assets/people.svg?react';
import Tour from '../../../assets/tour.svg?react';
import { ICampItem } from '../../shortCamps/interfaces';
import styles from '../index.module.css';
import { useState } from 'react';

export const Packages = () => {
  const { camp } = useAsyncValue() as {
    camp: ICampItem;
  };
  const [showPricesInfo, setShowPricesInfo] = useState<Record<string, boolean>>(
    {},
  );

  const togglePricesInfo = (packId: number) => {
    if (packId in showPricesInfo) {
      setShowPricesInfo((prev) => ({ ...prev, [packId]: !prev[packId] }));
    } else {
      setShowPricesInfo((prev) => ({ ...prev, [packId]: true }));
    }
  };

  return (
    <div className={styles.column}>
      <h2>{'Что входит в стоимость'}</h2>

      <div className={styles.package_row}>
        {camp.packages?.map((pack) => (
          <div key={pack.packageId} className={styles.pack_card}>
            <img
              src={'/src/assets/pack_back.jpg'}
              alt={pack.name}
              className={styles.back_card}
            />
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
            <div onClick={() => togglePricesInfo(pack.packageId)}>
              {showPricesInfo[pack.packageId] ? (
                <div className={styles.pack_prices_info}>
                  <span>
                    <span
                      className={styles.total_price}
                    >{`${pack.firstPrice} ₽ `}</span>
                    <span
                      className={styles.pack_limit}
                    >{`до ${pack.firstLimitation}`}</span>
                  </span>
                  <span>
                    <span
                      className={styles.total_price}
                    >{`${pack.secondPrice} ₽ `}</span>
                    <span
                      className={styles.pack_limit}
                    >{`до ${pack.secondLimitation}`}</span>
                  </span>
                  <span>
                    <span
                      className={styles.total_price}
                    >{`${pack.thirdPrice} ₽ `}</span>
                    <span
                      className={styles.pack_limit}
                    >{`до ${pack.thirdLimitation}`}</span>
                  </span>
                </div>
              ) : (
                <>
                  <h4
                    className={styles.total_price}
                  >{`${pack.totalPrice} ₽*`}</h4>
                  <span
                    className={styles.cost_link}
                  >{`*${pack.costNamingLink}`}</span>
                  <span
                    className={styles.booking_price}
                  >{`предоплата по спорт пакету - ${pack.bookingPrice} ₽`}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
