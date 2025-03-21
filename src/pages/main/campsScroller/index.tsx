import { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { Route } from '../+types';
import { createImageUrl } from '../../../constants';
import { useDeviceDetect } from '../../../hooks';
import { Control } from '../../../templates/controlArrow';
import styles from '../index.module.css';

export const CampsScroller: React.FC = () => {
  const { isMobile } = useDeviceDetect();
  return (
    <div className={isMobile ? styles.camps_wrap_mobi : styles.camps_wrap}>
      <h2 className={styles.camps_header}>Ближайшие кемпы</h2>
      <div className={styles.camps_scroller}>
        <CampsTemplate />
      </div>
    </div>
  );
};

const CampsTemplate = () => {
  const { home } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();

  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(2);

  const onLeft = () => {
    if (!home?.camps.length) return;
    setStartIndex((prev) => (prev === 0 ? 0 : prev - 1));
    setLastIndex((prev) => (prev === 2 ? 2 : prev - 1));
  };
  const onRight = () => {
    if (!home?.camps.length) return;
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
      <Control onLeft={onLeft} onRight={onRight} show={!!home?.camps.length} />
      {home?.camps
        .filter((_, i) => i >= startIndex && i <= lastIndex)
        .map((item) => {
          return (
            <div
              key={item.id}
              className={isMobile ? styles.camp_card_mobi : styles.camp_card}
            >
              <p className={styles.camp_card_title}>{item.dateString}</p>
              <p className={styles.camp_card_subtitle}>{item.name}</p>
              <div
                className={
                  isMobile ? styles.camp_img_wrap_mobi : styles.camp_img_wrap
                }
              >
                <img
                  src={createImageUrl(item.imageCart?.url)}
                  alt="картинка кемпа"
                  className={isMobile ? styles.camp_img_mobi : styles.camp_img}
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
