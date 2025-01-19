import { useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import ArrowLeft from '../../../assets/arrowLeft.svg?react';
import ArrowRight from '../../../assets/arrowRight.svg?react';
import { Route } from '../+types';
import { createImageUrl } from '../../../constants';
import styles from '../index.module.css';

export const Videos = () => {
  const { about } = useLoaderData<Route.ComponentProps['loaderData']>();

  const [count, setCount] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const divRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (divRef.current?.clientWidth && cardRef.current?.clientWidth) {
      const calcCount = Math.floor(
        divRef.current.clientWidth / cardRef.current.clientWidth,
      );
      setCount(calcCount);
    }
  }, [divRef.current?.clientWidth, cardRef.current?.clientWidth]);

  const onLeft = () => {
    if (!about?.gallery?.length) return;
    if (startIndex === 0) return;
    setStartIndex(startIndex - 1);
  };
  const onRight = () => {
    if (!about?.gallery?.length) return;
    if (about?.gallery.length < count) return;
    if (startIndex + count === about.gallery.length) return;
    setStartIndex(startIndex + 1);
  };

  return (
    <div className={styles.images_scroller} ref={divRef}>
      <ArrowLeft className={styles.scroll_arrow_left} onClick={onLeft} />
      <ArrowRight className={styles.scroll_arrow_right} onClick={onRight} />
      {about?.gallery
        ?.filter((_, i) => i >= startIndex && i <= startIndex + count)
        .map((image) => {
          return (
            <div key={image.id} className={styles.image_card} ref={cardRef}>
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
