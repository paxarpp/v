import { useLoaderData } from 'react-router';
import ArrowLeft from '../../../assets/arrowLeft.svg?react';
import ArrowRight from '../../../assets/arrowRight.svg?react';

import { Route } from '../+types';
import styles from '../index.module.css';
import { useState } from 'react';

export const ImagesList: React.FC = () => {
  const { images } = useLoaderData<Route.ComponentProps['loaderData']>();

  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(2);

  const onLeft = () => {
    if (!images?.length) return;
    setStartIndex((prev) => (prev === 0 ? 0 : prev - 1));
    setLastIndex((prev) => (prev === 2 ? 2 : prev - 1));
  };
  const onRight = () => {
    if (!images?.length) return;
    if (images.length < 2) return;
    if (images.length - lastIndex !== 1) {
      setStartIndex((prev) =>
        prev === images.length - 2 ? images.length - 2 : prev + 1,
      );
      setLastIndex((prev) =>
        prev === images.length ? images.length : prev + 1,
      );
    }
  };

  return (
    <div className={styles.images_scroller}>
      <ArrowLeft className={styles.scroll_arrow_left} onClick={onLeft} />
      <ArrowRight className={styles.scroll_arrow_right} onClick={onRight} />
      {images
        ?.filter((_, i) => i >= startIndex && i <= lastIndex)
        .map((image) => {
          return (
            <div key={image.id} className={styles.image_card}>
              <img
                src={image.url}
                alt={image.name}
                className={styles.coach_image}
              />
            </div>
          );
        })}
    </div>
  );
};
