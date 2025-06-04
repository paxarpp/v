import { useLoaderData } from 'react-router';
import { Route } from '../+types';
import { createImageUrl } from '../../../constants';
import { useDeviceDetect } from '../../../hooks';
import { CarouselTemplate } from '../../../templates/carousel';
import { ImageViewer } from '../../../templates/imageViewer';
import styles from '../index.module.css';

export const ImagesList: React.FC = () => {
  const { images } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();

  const list =
    images?.map((image) => {
      return (
        <div
          key={image.id}
          className={isMobile ? styles.image_card_mobi : styles.image_card}
        >
          <ImageViewer
            src={createImageUrl(image.url)}
            alt={image.name}
            className={styles.coach_image}
          />
        </div>
      );
    }) || [];

  return (
    <CarouselTemplate
      responsiveProps={
        isMobile
          ? {
              mobile: {
                breakpoint: { max: 1024, min: 0 },
                items: 2,
              },
            }
          : {}
      }
    >
      {list}
    </CarouselTemplate>
  );
};
