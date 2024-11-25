import { Await, useAsyncValue, useLoaderData } from 'react-router-dom';
import { ICamp } from '../interfaces';
import ArrowLeft from '../../../assets/arrowLeft.svg?react';
import ArrowRight from '../../../assets/arrowRight.svg?react';
import styles from '../index.module.css';
import { Suspense, useState } from 'react';

export const CampsScroller: React.FC = () => {
  const { camps } = useLoaderData() as {
    camps: ICamp[];
  };

  return (
    <div className={styles.camps_wrap}>
      <h2 className={styles.camps_header}>Ближайшие кемпы</h2>
      <div className={styles.camps_scroller}>
        <Suspense fallback={<CampsSkeleton />}>
          <Await resolve={camps}>
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
  )
}

const CampsTemplate = () => {
  const { camps } = useAsyncValue() as {
    camps: ICamp[];
  };

  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(2);

  const onLeft = () => {
    if (!camps.length) return;
    setStartIndex((prev) => (prev === 0 ? 0 : prev - 1));
    setLastIndex((prev) => (prev === 2 ? 2 : prev - 1));
  };
  const onRight = () => {
    if (!camps.length) return;
    if (camps.length - lastIndex !== 1) {
      setStartIndex((prev) =>
        prev === camps.length - 2 ? camps.length - 2 : prev + 1,
      );
      setLastIndex((prev) => (prev === camps.length ? camps.length : prev + 1));
    }
  };

  return (
    <>
      <ArrowLeft className={styles.scroll_arrow_left} onClick={onLeft} />   
      <ArrowRight className={styles.scroll_arrow_right} onClick={onRight} />
      {camps
        .filter((_, i) => i >= startIndex && i <= lastIndex)
        .map((item) => {
          return (
            <div key={item.id} className={styles.camp_card}>
              <p>{item.name}</p>
              <p>
                {item.dateStart}-{item.dateEnd}
              </p>
              <div className={styles.camp_img_wrap}>
                <img
                  src={item.mainImage.url}
                  alt="картинка кэмпа"
                  className={styles.camp_img}
                />
              </div>
              <div className={styles.camp_info}>
                <button className={styles.button_camp}>Подробнее</button>
              </div>
            </div>
          );
        })}
    </>
  );
}
