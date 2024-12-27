import World from '../../../assets/world.svg?react';
import Calendar from '../../../assets/calendar.svg?react';
import People from '../../../assets/people.svg?react';
import styles from '../index.module.css';

export const CampInfoIcons = () => {
  return (
    <div className={styles.info_row}>
      <div className={styles.info_card}>
        <World />
        <span>На территории собственной базы Пляж House</span>
      </div>
      <div className={styles.info_card}>
        <Calendar />
        <span>Продолжительность кемпа 3-4 дня (Чт/Пт-Вс)</span>
      </div>
      <div className={styles.info_card}>
        <People />
        <span>Подходит для игроков любого уровня</span>
      </div>
    </div>
  );
};
