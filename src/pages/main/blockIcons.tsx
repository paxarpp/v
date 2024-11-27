import BestGroup from '../../assets/bestGroup.svg?react';
import RightWay from '../../assets/rightWay.svg?react';
import Actions from '../../assets/actions.svg?react';
import styles from './index.module.css';
import { useDeviceDetect } from '../../hooks';

export const BlockIcons = () => {
  const { isMobile } = useDeviceDetect();
  return (
    <div className={isMobile ? styles.block_icons_mobile : styles.block_icons}>
      <div className={isMobile ? styles.block_icon_mobile : styles.block_icon}>
        <BestGroup />
        <span className={styles.icon_title}>Лучшая команда</span>
        <span className={styles.icon_sub_title}>
          Работаем 24/7 для общего результата
        </span>
      </div>
      <div
        className={
          isMobile
            ? styles.block_icon_between_mobile
            : styles.block_icon_between
        }
      >
        <RightWay />
        <span className={styles.icon_title}>Правильный подход</span>
        <span className={styles.icon_sub_title}>
          Ставим цели и идем вместе к ним
        </span>
      </div>
      <div className={isMobile ? styles.block_icon_mobile : styles.block_icon}>
        <Actions />
        <span className={styles.icon_title}>Действия, а не слова</span>
        <span className={styles.icon_sub_title}>
          Слова ценятся тогда, когда совпадают с действиями
        </span>
      </div>
    </div>
  );
};
