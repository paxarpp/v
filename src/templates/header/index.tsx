import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg?react';
import Burger from '../../assets/burger.svg?react';
import Vk from '../../assets/vk.svg?react';
import T from '../../assets/t.svg?react';
import Inst from '../../assets/inst.svg?react';
import { logout as apiLogout } from '../../api';
import { useUser } from '../../context';
import { useDeviceDetect } from '../../hooks';
import styles from './index.module.css';

export const Header: React.FC<{ toggleAuthOpen: () => void }> = ({
  toggleAuthOpen,
}) => {
  const { user, logout } = useUser();
  const isAuth = !!user;
  const { isMobile } = useDeviceDetect();
  const [isOpenPopapMenu, openPopapMenu] = useState(false);

  const onLogout = () => {
    apiLogout();
    document.cookie = `magicVolley=;`;
    logout();
  };

  const togglePopapMenu = () => {
    openPopapMenu((prev) => !prev);
  };

  return isMobile ? (
    <div className={styles.header_mobile}>
      <Link to="/">
        <Logo />
      </Link>
      <div className={styles.icons_mobile}>
        <Vk />
        <T />
        <Inst />
      </div>
      <div className={styles.burger}>
        <Burger onClick={togglePopapMenu} />
        {isOpenPopapMenu ? (
          <div className={styles.popap_menu} onClick={togglePopapMenu}>
            <ul className={styles.menu_popap}>
              <li>
                <Link to="/weekendCamps">Кемпы на выходные</Link>
              </li>
              <li>
                <Link to="/longCamps">Кемпы длинные</Link>
              </li>
              <li>
                <Link to="/trainingSchedule">Расписание тренировок</Link>
              </li>
              <li>
                <Link to="/about">О нас</Link>
              </li>
              <li>
                <Link to="/allCoahes">Тренеры</Link>
              </li>
            </ul>
            <button
              className={styles.button}
              onClick={isAuth ? onLogout : toggleAuthOpen}
            >
              {isAuth ? 'Выйти' : 'Войти'}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <div className={styles.header}>
      <ul className={styles.menu}>
        <li>
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li>
          <Link to="/weekendCamps">Кемпы на выходные</Link>
        </li>
        <li>
          <Link to="/longCamps">Кемпы длинные</Link>
        </li>
        <li>
          <Link to="/trainingSchedule">Расписание тренировок</Link>
        </li>
        <li>
          <Link to="/about">О нас</Link>
        </li>
        <li>
          <Link to="/allCoahes">Тренеры</Link>
        </li>
      </ul>
      <div className={styles.icons}>
        <Vk />
        <T />
        <Inst />
      </div>
      <button
        className={styles.button}
        onClick={isAuth ? onLogout : toggleAuthOpen}
      >
        {isAuth ? 'Выйти' : 'Войти'}
      </button>
    </div>
  );
};
