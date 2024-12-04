import { useAsyncValue } from 'react-router-dom';
import { useDeviceDetect } from '../../../hooks';
import styles from '../index.module.css';
import { IAbout } from '../interfaces';

export const Info = () => {
  const { about } = useAsyncValue() as {
    about: IAbout;
  };
  const { isMobile } = useDeviceDetect();
  return (
    <>
      <h2>{'О нас'}</h2>
      <h2>{about.title}</h2>
      <h3>{about.subTitleFirst}</h3>
      <h3>{about.subTitleSecond}</h3>
      <div className={isMobile ? styles.row_info_mobile : styles.row_info}>
        <div className={styles.block}>
          <span className={styles.sub_title}>{'> 35 000 тренировок'}</span>
        </div>
        <div className={styles.block}>
          <span className={styles.sub_title}>{'> 100 кемпов'}</span>
        </div>
        <div className={styles.block}>
          <span className={styles.sub_title}>{'> 3000 учеников'}</span>
        </div>
      </div>
    </>
  );
};
