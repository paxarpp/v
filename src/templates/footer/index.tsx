import Logo from '../../assets/logo.svg?react';
import Vk from '../../assets/vk.svg?react';
import T from '../../assets/t.svg?react';
import Inst from '../../assets/inst.svg?react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/">
        <Logo />
      </Link>
      <div>
        <span className={styles.menu_title}>Кемпы и тренировки</span>
        <ul className={styles.menu}>
          <li>
            <Link to="/weekendCamps">Кемпы на выходные</Link>
          </li>
          <li>
            <Link to="/longCamps">Кемпы длинные</Link>
          </li>
          <li>
            <Link to="/trainingSchedule">Расписание тренировок</Link>
          </li>
        </ul>
      </div>
      <div>
        <span className={styles.menu_title}>О школе</span>
        <ul className={styles.menu}>
          <li>
            <Link to="/about">О нас</Link>
          </li>
          <li>Отзывы</li>
          <li>Часто задаваемые вопросы</li>
          <li>
            <Link to="/allCoahes">Тренеры</Link>
          </li>
        </ul>
      </div>
      <div>
        <Vk className={styles.icon} />
        <T className={`${styles.icon} ${styles.mlr_20}`} />
        <Inst className={styles.icon} />
      </div>
    </footer>
  );
};
