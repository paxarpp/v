import { Suspense, useState } from 'react';
import { Await, Link, useAsyncValue, useLoaderData } from 'react-router-dom';
import { IHome } from '../interfaces';
import ArrowLeft from '../../../assets/arrowLeft.svg?react';
import ArrowRight from '../../../assets/arrowRight.svg?react';
import styles from '../index.module.css';

export const CampsScroller: React.FC = () => {
  const { home } = useLoaderData() as {
    home: IHome;
  };

  return (
    <div className={styles.camps_wrap}>
      <h2 className={styles.camps_header}>Ближайшие кемпы</h2>
      <div className={styles.camps_scroller}>
        <Suspense fallback={<CampsSkeleton />}>
          <Await resolve={home}>
            <CampsTemplate />
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

const CampsSkeleton = () => {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div className={styles.camp_card} key={i}>
          <p>{i}</p>
          <p>загрузка...</p>
          <div className={styles.camp_img_wrap}>
            <div className={styles.camp_img_dump} />
          </div>
          <div className={styles.camp_info}>
            <button disabled={true} className={styles.button_camp}>
              Подробнее
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

const CampsTemplate = () => {
  const { home } = useAsyncValue() as {
    home: IHome;
  };

  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(2);

  const onLeft = () => {
    if (!home.camps.length) return;
    setStartIndex((prev) => (prev === 0 ? 0 : prev - 1));
    setLastIndex((prev) => (prev === 2 ? 2 : prev - 1)); // fixme
  };
  const onRight = () => {
    if (!home.camps.length) return;
    if (home.camps.length < 2) return;
    if (home.camps.length - lastIndex !== 1) {
      setStartIndex((prev) =>
        prev === home.camps.length - 2 ? home.camps.length - 2 : prev + 1,
      );
      setLastIndex((prev) =>
        prev === home.camps.length ? home.camps.length : prev + 1,
      );
    }
  };

  return (
    <>
      <ArrowLeft className={styles.scroll_arrow_left} onClick={onLeft} />
      <ArrowRight className={styles.scroll_arrow_right} onClick={onRight} />
      {home.camps
        .filter((_, i) => i >= startIndex && i <= lastIndex)
        .map((item) => {
          return (
            <div key={item.id} className={styles.camp_card}>
              <p>{item.name}</p>
              <p>{item.dateString}</p>
              <div className={styles.camp_img_wrap}>
                <img
                  src={item.imageCart.url}
                  alt="картинка кэмпа"
                  className={styles.camp_img}
                />
              </div>
              <div className={styles.camp_info}>
                <Link to={`/camps/${item.id}`} className={styles.button_camp}>
                  Подробнее
                </Link>
              </div>
            </div>
          );
        })}
    </>
  );
};
