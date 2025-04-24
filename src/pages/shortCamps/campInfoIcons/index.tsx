import World from '../../../assets/world.svg?react';
import Calendar from '../../../assets/calendar.svg?react';
import People from '../../../assets/people.svg?react';
import { useDeviceDetect } from '../../../hooks';
import styles from '../index.module.css';

export const CampInfoIcons = () => {
  const { isMobile } = useDeviceDetect();
  return (
    <div className={isMobile ? styles.info_row_mobi : styles.info_row}>
      <div className={isMobile ? styles.block_icon_mobile : styles.info_card}>
        <World className={isMobile ? styles.info_icon_mobi : ''} />
        <span className={isMobile ? styles.camp_info_mobi : styles.camp_info}>
          На территории собственной базы
        </span>
      </div>
      <div className={isMobile ? styles.block_icon_mobile : styles.info_card}>
        <Calendar className={isMobile ? styles.info_icon_mobi : ''} />
        <span className={isMobile ? styles.camp_info_mobi : styles.camp_info}>
          Продолжительность кемпа 3-4 дня
        </span>
      </div>
      <div className={isMobile ? styles.block_icon_mobile : styles.info_card}>
        <People className={isMobile ? styles.info_icon_mobi : ''} />
        <span className={isMobile ? styles.camp_info_mobi : styles.camp_info}>
          Подходит для игроков всех уровней
        </span>
      </div>
    </div>
  );
};
