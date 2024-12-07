import { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import { useDeviceDetect } from '../../../hooks';
import { IAbout } from '../interfaces';
import ArrowLeft from '../../../assets/arrowLeft.svg?react';
import ArrowRight from '../../../assets/arrowRight.svg?react';
import styles from '../index.module.css';

export const Reviews = () => {
  const { about } = useAsyncValue() as {
    about: IAbout;
  };
  const { isMobile } = useDeviceDetect();

  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(2);

  const onLeft = () => {
    if (!about.reviews.length) return;
    setStartIndex((prev) => (prev === 0 ? 0 : prev - 1));
    setLastIndex((prev) => (prev === 2 ? 2 : prev - 1)); //fixme
  };
  const onRight = () => {
    if (!about.reviews.length) return;
    if (about.reviews.length < 2) return;
    if (about.reviews.length - lastIndex !== 1) {
      setStartIndex((prev) =>
        prev === about.reviews.length - 2 ? about.reviews.length - 2 : prev + 1,
      );
      setLastIndex((prev) =>
        prev === about.reviews.length ? about.reviews.length : prev + 1,
      );
    }
  };

  return (
    <div className={styles.reviews_block}>
      <ArrowLeft className={styles.scroll_arrow_left} onClick={onLeft} />
      <ArrowRight className={styles.scroll_arrow_right} onClick={onRight} />
      {about.reviews
        .filter((_, i) => i >= startIndex && i <= lastIndex)
        .map((item, indx) => {
          return (
            <div key={item.name + indx} className={styles.review_card}>
              <div className={styles.card_row_user}>
                <img
                  src={item.image.url}
                  alt="user"
                  className={styles.review_img}
                />
                <div className={styles.reviewer}>
                  <span>{item.name}</span>
                  <span>{item.date}</span>
                </div>
              </div>
              <div  className={styles.card_row_comment}>{item.comment}</div>
            </div>
          );
        })}
    </div>
  );
};
