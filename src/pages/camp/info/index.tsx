import { useLoaderData } from 'react-router';
import { Route } from '../+types';
import { ImagePack } from '../../../templates/imagesPack';
import styles from '../index.module.css';

export const Info = () => {
  const { camp } = useLoaderData<Route.ComponentProps['loaderData']>();

  return (
    <div className={styles.info_wrap}>
      <h2 className={styles.camp_info_title}>{camp?.name}</h2>
      <div className={styles.info_row}>
        <ImagePack images={camp?.images} />
        <ul className={styles.info_list}>
          {camp?.info
            ?.split(';')
            .filter(Boolean)
            .map((inf, i) => <li key={i + 'info'}>{inf}</li>)}
        </ul>
      </div>
    </div>
  );
};
