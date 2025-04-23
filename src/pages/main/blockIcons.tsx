import BestGroup from '../../assets/bestGroup.svg?react';
import Hands from '../../assets/hands.svg?react';
import Result from '../../assets/result.svg?react';
import { useDeviceDetect } from '../../hooks';
import styles from './index.module.css';

export const BlockIcons = () => {
  const { isMobile } = useDeviceDetect();
  return (
    <div className={isMobile ? styles.block_icons_mobile : styles.block_icons}>
      <div className={isMobile ? styles.block_icon_mobile : styles.block_icon}>
        <BestGroup className={isMobile ? styles.icon_mobi : ''} />
        <span className={isMobile ? styles.icon_title_mobi : styles.icon_title}>
          Команда профессионалов
        </span>
        <span
          className={
            isMobile ? styles.icon_sub_title_mobi : styles.icon_sub_title
          }
        >
          Работаем 24/7
        </span>
      </div>
      <div className={isMobile ? styles.block_icon_mobile : styles.block_icon}>
        <Hands className={isMobile ? styles.icon_mobi : ''} />
        <span className={isMobile ? styles.icon_title_mobi : styles.icon_title}>
          Грамотный подход
        </span>
        <span
          className={
            isMobile ? styles.icon_sub_title_mobi : styles.icon_sub_title
          }
        >
          Объясняем сложное простыми словами
        </span>
      </div>
      <div className={isMobile ? styles.block_icon_mobile : styles.block_icon}>
        <Result className={isMobile ? styles.icon_mobi : ''} />
        <span className={isMobile ? styles.icon_title_mobi : styles.icon_title}>
          Гарантия результата
        </span>
        <span
          className={
            isMobile ? styles.icon_sub_title_mobi : styles.icon_sub_title
          }
        >
          Ваш прогресс уже сегодня
        </span>
      </div>
    </div>
  );
};
