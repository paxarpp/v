import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { Route } from '../+types';
import { createImageUrl } from '../../../constants';
import { Control } from '../../../templates/controlArrow';
import { useDeviceDetect } from '../../../hooks';
import { ImagesMobileScroller } from '../../../templates/ImagesMobileScroller';
import styles from '../index.module.css';

export const ImagesList: React.FC = () => {
  const { images } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();

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

  return isMobile ? (
    <div className={styles.images_scroller_mobi}>
      <ImagesMobileScroller list={images || []} />
    </div>
  ) : (
    <div className={styles.images_scroller}>
      <Control show={!!images?.length} onLeft={onLeft} onRight={onRight} />
      {images
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
