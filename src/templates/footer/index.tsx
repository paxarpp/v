import Logo from '../../assets/logo.svg?react';
import Vk from '../../assets/vk.svg?react';
import T from '../../assets/t.svg?react';
import Inst from '../../assets/inst.svg?react';
import styles from './index.module.css';
import { Link } from 'react-router';
import { createLinkTg } from '../../constants';

interface IProps {
  linkTg: string;
  linkInstagram: string;
  linkVk: string;
}

export const Footer: React.FC<IProps> = ({ linkTg, linkInstagram, linkVk }) => {
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
        </ul>
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
