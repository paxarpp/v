import { SyntheticEvent, useState } from 'react';
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
import { useDeviceDetect } from '../../../hooks';
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
  const { isMobile } = useDeviceDetect();
  const [rSuccess, setReservationSuccess] = useState(false);
  const { user, logout } = useUser();
  const { toggleAuthOpen } = useAuth();
  const [showPricesInfo, setShowPricesInfo] = useState<Record<string, boolean>>(
    {},
  );

  const togglePricesInfo = (e: SyntheticEvent, packId: number) => {
    e.stopPropagation();
    if (packId in showPricesInfo) {
      setShowPricesInfo((prev) => ({ ...prev, [packId]: !prev[packId] }));
    } else {
      setShowPricesInfo((prev) => ({ ...prev, [packId]: true }));
    }
  };

  const closePricesInfo = (packId: number) => {
    setShowPricesInfo((prev) => ({ ...prev, [packId]: false }));
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
    <div className={isMobile ? styles.column_mobi : styles.column}>
      <h2
        className={
          isMobile ? styles.camp_info_title_mobi : styles.camp_info_title
        }
      >
        {'Что входит в стоимость'}
      </h2>
      <h4
        className={
          isMobile ? styles.camp_card_subtitle_mobi : styles.camp_card_subtitle
        }
      >{`Свободно ${camp?.countFree} мест`}</h4>
      <div className={styles.package_row}>
        {camp?.packages?.map((pack) => {
          const isTour = pack.type === 'TOUR';
          return (
            <div
              key={pack.packageId}
              className={styles.pack_card}
              onClick={() => closePricesInfo(pack.packageId)}
            >
              <img
                src={getPackImgUrl(pack.type)}
                alt={pack.name}
                className={styles.back_card}
              />
              {isTour ? (
                <Tour className={styles.pack_icon} />
              ) : (
                <People className={styles.pack_icon} />
              )}
              <h4 className={styles.pack_title}>{pack.displayName}</h4>
              <ul className={styles.pack_info}>
                {pack.info
                  .split(';')
                  .filter(Boolean)
                  .map((inf, i) => (
                    <li key={i + 'pack'}>{inf}</li>
                  ))}
              </ul>
              <div>
                <h4
                  className={styles.total_price}
                >{`${divideNumberByPieces(pack.totalPrice)} ₽*`}</h4>
                <span
                  className={styles.cost_link}
                  onClick={(e) => togglePricesInfo(e, pack.packageId)}
                >{`*${pack.costNamingLink}`}</span>
                <span className={styles.booking_price}>
                  {isTour
                    ? `предоплата по туру - ${divideNumberByPieces(pack.bookingPrice)}`
                    : `предоплата по спорт пакету - ${divideNumberByPieces(pack.bookingPrice)} ₽`}
                </span>
              </div>
              {showPricesInfo[pack.packageId] ? (
                <div className={styles.pack_prices_info}>
                  {pack.firstPrice ? (
                    <span>
                      <span
                        className={styles.total_price}
                      >{`${divideNumberByPieces(pack.firstPrice)} ₽ `}</span>
                      <span
                        className={styles.pack_limit}
                      >{`до ${pack.firstLimitationString}`}</span>
                    </span>
                  ) : null}
                  {pack.secondPrice ? (
                    <span>
                      <span
                        className={styles.total_price}
                      >{`${divideNumberByPieces(pack.secondPrice)} ₽ `}</span>
                      <span
                        className={styles.pack_limit}
                      >{`до ${pack.secondLimitationString}`}</span>
                    </span>
                  ) : null}
                  {pack.thirdPrice ? (
                    <span>
                      <span
                        className={styles.total_price}
                      >{`${divideNumberByPieces(pack.thirdPrice)} ₽ `}</span>
                      <span
                        className={styles.pack_limit}
                      >{`до ${pack.thirdLimitationString}`}</span>
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {rSuccess && user ? (
        <div className={styles.success}>
          <Successfully />
          <h3>{`${user.username}, ваша бронь принята. В ближайшее время мы свяжемся с вами!`}</h3>
        </div>
      ) : (
        <button
          className={
            isMobile ? styles.button_profile_mobi : styles.button_profile
          }
          onClick={onReservation}
        >
          {'Забронировать'}
        </button>
      )}
    </div>
  );
};
