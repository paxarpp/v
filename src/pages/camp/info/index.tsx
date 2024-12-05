import { useAsyncValue } from 'react-router-dom';
import { ICampItem } from '../interfaces';
import { ImagePack } from '../../../templates/imagesPack';
import styles from '../index.module.css';

export const Info = () => {
  const { camp } = useAsyncValue() as {
    camp: ICampItem;
  };

  return (
    <div className={styles.info_row}>
      <ImagePack images={camp.images} />
      <ul className={styles.info_list}>
        {camp.info
          ?.split(';')
          .filter(Boolean)
          .map((inf, i) => <li key={i + 'info'}>{inf}</li>)}
      </ul>
    </div>
  );
};
