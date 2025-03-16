import World from '../../../assets/world.svg?react';
import Calendar from '../../../assets/calendar.svg?react';
import People from '../../../assets/people.svg?react';
import styles from '../index.module.css';

export const CampInfoIcons = () => {
  return (
    <div className={styles.info_row}>
      <div className={styles.info_card}>
        <World />
        <span className={styles.camp_info}>На территории собственной базы</span>
      </div>
      <div className={styles.info_card}>
        <Calendar />
        <span className={styles.camp_info}>
          Продолжительность кемпа 3-4 дня
        </span>
      </div>
      <div className={styles.info_card}>
        <People />
        <span className={styles.camp_info}>
          Подходит для игроков всех уровней
        </span>
      </div>
    </div>
  );
};
