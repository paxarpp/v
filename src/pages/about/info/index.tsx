import { useDeviceDetect } from '../../../hooks';
import styles from '../index.module.css';

export const Info = () => {
  const { isMobile } = useDeviceDetect();
  return (
    <>
      <h2>{'О нас'}</h2>
      <h2>{'Magic Volley'}</h2>
      <h3>{'Организаторы кемпов по всему миру'}</h3>
      <h3>{'Делаем вашу жизнь яркой, спортивной и разнообразной'}</h3>
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
