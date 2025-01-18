import { useState } from 'react';
import { useLoaderData } from 'react-router';
import ArrowLeft from '../../../assets/arrowLeft.svg?react';
import ArrowRight from '../../../assets/arrowRight.svg?react';
import { Route } from '../+types';
import { IImage } from '../interfaces';
import { createImageUrl } from '../../../constants';
import styles from '../index.module.css';

export const Videos = () => {
  const { about } = useLoaderData<Route.ComponentProps['loaderData']>();

  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(2);

  const onLeft = () => {
    if (!about?.gallery?.length) return;
    setStartIndex((prev) => (prev === 0 ? 0 : prev - 1));
    setLastIndex((prev) => (prev === 2 ? 2 : prev - 1));
  };
  const onRight = () => {
    if (!about?.gallery?.length) return;
    if (about?.gallery.length < 2) return;
    if (about?.gallery.length - lastIndex !== 1) {
      setStartIndex((prev) =>
        prev === (about.gallery as IImage[]).length
          ? (about.gallery as IImage[]).length - 2
          : prev + 1,
      );
      setLastIndex((prev) =>
        prev === (about.gallery as IImage[]).length
          ? (about.gallery as IImage[]).length
          : prev + 1,
      );
    }
  };

  return (
    <div className={styles.images_scroller}>
      <ArrowLeft className={styles.scroll_arrow_left} onClick={onLeft} />
      <ArrowRight className={styles.scroll_arrow_right} onClick={onRight} />
      {about?.gallery
        ?.filter((_, i) => i >= startIndex && i <= lastIndex)
        .map((image) => {
          return (
            <div key={image.id} className={styles.image_card}>
              <img
                src={createImageUrl(image.url)}
                alt={image.name}
                className={styles.coach_image}
              />
            </div>
          );
        })}
    </div>
  );
};
