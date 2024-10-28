import Logo from '../../../assets/logo.svg?react';
import styles from '../index.module.css';

export const Days = () => {
  return (
    <div className={styles.group}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.day_name}>Пн</div>
      <div className={styles.day_name}>Вт</div>
      <div className={styles.day_name}>Ср</div>
      <div className={styles.day_name}>Чт</div>
      <div className={styles.day_name}>Пт</div>
    </div>
  );
};
