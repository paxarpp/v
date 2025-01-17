import { useLoaderData } from 'react-router';
import { Route } from '../+types';
import { createImageUrl } from '../../../constants';
import styles from '../index.module.css';

export const MainImage = () => {
  const { camp } = useLoaderData<Route.ComponentProps['loaderData']>();
  return (
    <div className={styles.main_img_wrapper}>
      {camp?.imageCart ? (
        <img
          src={createImageUrl(camp?.mainImage?.url)}
          alt={camp?.name}
          className={styles.main_img}
        />
      ) : (
        'тут картинка'
      )}
      <span className={styles.name}>{camp?.name}</span>
      <span className={styles.date}>
        {camp?.dateString
          ? camp.dateString
          : `${camp?.dateStart}-${camp?.dateEnd}`}
      </span>
    </div>
  );
};
