import { useAsyncValue } from 'react-router-dom';
import { ICampItem } from '../../shotCamps/interfaces';
import styles from '../index.module.css';

export const MainImage = () => {
  const { camp } = useAsyncValue() as {
    camp: ICampItem;
  };
  return (
    <div className={styles.main_img_wrapper}>
      {camp.imageCart ? (
        <img
          src={camp.mainImage?.url}
          alt={camp.name}
          className={styles.main_img}
        />
      ) : (
        'тут картинка'
      )}
      <span className={styles.name}>{camp.name}</span>
      <span className={styles.date}>
        {camp.dateString
          ? camp.dateString
          : `${camp.dateStart}-${camp.dateEnd}`}
      </span>
    </div>
  );
};
