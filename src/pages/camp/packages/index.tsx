import { useState } from 'react';
import { useLoaderData } from 'react-router';
import People from '../../../assets/people.svg?react';
import Successfully from '../../../assets/successfully.svg?react';
import Tour from '../../../assets/tour.svg?react';
import { Route } from '../+types';
import { useAuth, useUser } from '../../../context';
import { api } from '../../../api/api';
import { creatorRequest } from '../../../api';
import imgUrlPrem from '../../../assets/premium.jpg';
import imgUrlGold from '../../../assets/gold.jpg';
import imgUrlSilver from '../../../assets/silver.jpg';
import imgUrlTour from '../../../assets/tour.jpg';
import { IType } from '../interfaces';
import styles from '../index.module.css';

const getPackImgUrl = (type: IType) => {
  switch (type) {
    case 'TOUR':
      return imgUrlTour;
    case 'GOLD':
      return imgUrlGold;
    case 'PREMIUM':
      return imgUrlPrem;
    case 'SILVER':
      return imgUrlSilver;
    default:
      return imgUrlTour;
  }
};

const divideNumberByPieces = (x: number, delimiter = ' ') =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);

export const Packages = () => {
  const { camp } = useLoaderData<Route.ComponentProps['loaderData']>();
  const [rSuccess, setReservationSuccess] = useState(false);
  const { user, logout } = useUser();
  const { toggleAuthOpen } = useAuth();
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

  const onReservation = () => {
    if (!camp) return;
    const reservation = async () => {
      if (user) {
        const campId = camp.id;
        const userId = user.id;
        const axiosCall = creatorRequest(logout);
        const { result, error } = await axiosCall(
          api.campReservation(campId, userId),
        );
        if (!error && result?.data.result) {
          setReservationSuccess(true);
        }
      }
    };
    if (user) {
      reservation();
    } else {
      toggleAuthOpen(camp.id);
    }
  };

  return (
    <div className={styles.column}>
      <h2>{'Что входит в стоимость'}</h2>
      <h4>{`Свободно ${camp?.countFree} мест`}</h4>
      <div className={styles.package_row}>
        {camp?.packages?.map((pack) => (
          <div key={pack.packageId} className={styles.pack_card}>
            <img
              src={getPackImgUrl(pack.type)}
              alt={pack.name}
              className={styles.back_card}
            />
            {pack.type === 'TOUR' ? (
              <Tour className={styles.pack_icon} />
            ) : (
              <People className={styles.pack_icon} />
            )}
            <h4 className={styles.pack_title}>{pack.name}</h4>
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
                    >{`${divideNumberByPieces(pack.firstPrice)} ₽ `}</span>
                    <span
                      className={styles.pack_limit}
                    >{`до ${pack.firstLimitation}`}</span>
                  </span>
                  <span>
                    <span
                      className={styles.total_price}
                    >{`${divideNumberByPieces(pack.secondPrice)} ₽ `}</span>
                    <span
                      className={styles.pack_limit}
                    >{`до ${pack.secondLimitation}`}</span>
                  </span>
                  <span>
                    <span
                      className={styles.total_price}
                    >{`${divideNumberByPieces(pack.thirdPrice)} ₽ `}</span>
                    <span
                      className={styles.pack_limit}
                    >{`до ${pack.thirdLimitation}`}</span>
                  </span>
                </div>
              ) : (
                <>
                  <h4
                    className={styles.total_price}
                  >{`${divideNumberByPieces(pack.totalPrice)} ₽*`}</h4>
                  <span
                    className={styles.cost_link}
                  >{`*${pack.costNamingLink}`}</span>
                  <span
                    className={styles.booking_price}
                  >{`предоплата по спорт пакету - ${divideNumberByPieces(pack.bookingPrice)} ₽`}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {rSuccess && user ? (
        <div className={styles.success}>
          <Successfully />
          <h3>{`${user.username}, ваша бронь принята. В ближайшее время мы свяжемся с вами!`}</h3>
        </div>
      ) : (
        <button className={styles.button_profile} onClick={onReservation}>
          {'Забронировать'}
        </button>
      )}
    </div>
  );
};
