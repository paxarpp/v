import Logo from '../../assets/logo.svg?react';
import Vk from '../../assets/vk.svg?react';
import T from '../../assets/t.svg?react';
import Inst from '../../assets/inst.svg?react';
import { Link } from 'react-router';
import { createLinkTg } from '../../constants';
import { useDeviceDetect } from '../../hooks';
import styles from './index.module.css';

interface IProps {
  linkTg?: string;
  linkInstagram?: string;
  linkVk?: string;
}

export const Footer: React.FC<IProps> = ({ linkTg, linkInstagram, linkVk }) => {
  const { isMobile } = useDeviceDetect();
  return (
    <footer className={isMobile ? styles.footer_mobi : styles.footer}>
      <Link to="/">
        <Logo />
      </Link>
      <div>
        <span className={styles.menu_title}>Пляжный волейбол</span>
        <ul className={styles.menu}>
          <li>
            <Link to="/weekendCamps">Кемпы выходного дня</Link>
          </li>
          <li>
            <Link to="/longCamps">Недельные кемпы</Link>
          </li>
          <li>
            <Link to="/oldCamps">Прошедшие кемпы</Link>
          </li>
          <li>
            <Link to="/beachCoaches">Тренеры</Link>
          </li>
        </ul>
      </div>
      <div>
        <span className={styles.menu_title}>Классический волейбол</span>
        <ul className={styles.menu}>
          <li>
            <Link to="/trainingSchedule">Расписание</Link>
          </li>
          <li>
            <Link to="/">Турниры</Link>
          </li>
          <li>
            <Link to="/classicCoaches">Тренеры</Link>
          </li>
        </ul>
      </div>
      <div>
        <span className={styles.menu_title}>О школе</span>
        <ul className={styles.menu}>
          <li>Отзывы</li>
          <li>Часто задаваемые вопросы</li>
        </ul>
      </div>
      <div>
        <span className={styles.menu_title}>Детский лагерь</span>
      </div>
      <div>
        <a href={linkVk} target={'_blank'} className={styles.icon}>
          <Vk />
        </a>
        <a
          href={createLinkTg(linkTg)}
          target={'_blank'}
          className={`${styles.icon} ${styles.mlr_20}`}
        >
          <T />
        </a>
        <a href={linkInstagram} target={'_blank'} className={styles.icon}>
          <Inst />
        </a>
      </div>
    </footer>
  );
};
