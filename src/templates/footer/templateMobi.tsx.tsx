import Logo from '../../assets/logo.svg?react';
import Vk from '../../assets/vk.svg?react';
import T from '../../assets/t.svg?react';
import Inst from '../../assets/inst.svg?react';
import { Link } from 'react-router';
import { createLinkTg } from '../../constants';
import { IProps } from '.';
import styles from './index.module.css';
import { ScrollUpTo } from '../scrollUpTo';

export const TemplateMobi: React.FC<IProps> = ({
  linkTg,
  linkInstagram,
  linkVk,
}) => {
  return (
    <footer className={styles.footer_mobi}>
      <div className={styles.icons_mobi}>
        <Link to="/">
          <Logo className={styles.logo_mobi} />
        </Link>

        <div>
          <a href={linkVk} target={'_blank'} className={styles.icon}>
            <Vk className={styles.icon_mobi} />
          </a>
          <a
            href={createLinkTg(linkTg)}
            target={'_blank'}
            className={`${styles.icon} ${styles.mlr_10}`}
          >
            <T className={styles.icon_mobi} />
          </a>
          <a href={linkInstagram} target={'_blank'} className={styles.icon}>
            <Inst className={styles.icon_mobi} />
          </a>
        </div>
      </div>

      <div>
        <span className={`${styles.message} ${styles.mt_50}`}>
          ИП Кочетков Михаил Олегович
        </span>
        <span className={styles.message}>ИНН 623412482291</span>
        <span className={styles.message}>ОГРНИП 325620000000329</span>
      </div>

      <div>
        <ScrollUpTo />
        <span className={styles.menu_title_mobi}>Пляжный волейбол</span>
        <ul className={styles.menu_mobi}>
          <li>
            <Link to="/weekendCamps">Кемпы выходного дня</Link>
          </li>
          <li>
            <Link to="/longCamps">Недельные кемпы</Link>
          </li>
          <li>
            <Link to="/beachCoaches">Тренеры</Link>
          </li>
          <li>
            <Link to="/oldCamps">Прошедшие кемпы</Link>
          </li>
        </ul>
      </div>
      <div>
        <span className={styles.menu_title_mobi}>Классический волейбол</span>
        <ul className={styles.menu_mobi}>
          <li>
            <Link to="/trainingSchedule">Расписание</Link>
          </li>
          <li>
            <Link to="/classicCoaches">Тренеры</Link>
          </li>
        </ul>
      </div>
      <div>
        <Link to="/childCamps" className={styles.menu_title_mobi}>
          Детский лагерь
        </Link>
      </div>
      <div>
        <span className={styles.menu_title_mobi}>О нас</span>
        <ul className={styles.menu_mobi}>
          <li>
            <Link to="/about#reviews">Отзывы</Link>
          </li>
          <li>
            <Link to="/#questions">Часто задаваемые вопросы</Link>
          </li>
          <li>
            <Link to="/persanal">Политика обработки персональных данных</Link>
          </li>
          <li>
            <Link to="/agreement">Публичная оферта</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
