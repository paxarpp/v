import { useLoaderData } from 'react-router';
import { Route } from '../+types';
import { createImageUrl } from '../../../constants';
import { useDeviceDetect } from '../../../hooks';
import styles from '../index.module.css';

export const MainImage = () => {
  const { camp } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();
  return (
    <div
      className={
        isMobile ? styles.main_img_wrapper_mobi : styles.main_img_wrapper
      }
    >
      <img
        src={createImageUrl(camp?.mainImage?.url)}
        alt={camp?.name || 'изображение'}
        className={styles.main_img}
      />
      <span className={isMobile ? styles.name_mobi : styles.name}>
        {camp?.name}
      </span>
      <span className={isMobile ? styles.date_mobi : styles.date}>
        {camp?.dateString
          ? camp.dateString
          : `${camp?.dateStart}-${camp?.dateEnd}`}
      </span>
    </div>
  );
};
