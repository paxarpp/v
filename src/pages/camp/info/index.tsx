import { useAsyncValue } from 'react-router-dom';
import { ICampItem } from '../../shortCamps/interfaces';
import styles from '../index.module.css';
import { ImagePack } from '../../../templates/imagesPack';

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
