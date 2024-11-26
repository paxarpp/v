import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg?react';
import Burger from '../../assets/burger.svg?react';
import Vk from '../../assets/vk.svg?react';
import T from '../../assets/t.svg?react';
import ClosedIcon from '../../assets/closed.svg?react';
import Inst from '../../assets/inst.svg?react';
import { logout as apiLogout } from '../../api';
import { useUser, useAuth } from '../../context';
import { useDeviceDetect } from '../../hooks';
import { getCookie } from '../../cookie';
import styles from './index.module.css';

export const Header = () => {
  const { user, logout } = useUser();
  const { toggleAuthOpen } = useAuth();
  const isAuth = !!user;
  const { isMobile } = useDeviceDetect();
  const [isOpenPopapMenu, openPopapMenu] = useState(false);
  const { signin } = useUser();
  useEffect(() => {
    if (!isAuth) {
      const cookie = getCookie();
      if (cookie) {
        try {
          const raw = localStorage.getItem('user');
          if (raw) {
            const user = JSON.parse(raw);
            signin(user);
          }
        } catch (e) {
          //
        }
      }
    }
  }, [isAuth]);

  const onLogout = () => {
    apiLogout();
    document.cookie = `magicVolley=`;
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
                <Link to="/weekendCamps">Кемпы выходного дня</Link>
              </li>
              <li>
                <Link to="/longCamps">Недельные кемпы</Link>
              </li>
              <li>
                <Link to="/oldCamps">Прошедшие кемпы</Link>
              </li>
              <li>
                <Link to="/allCoahes">Тренеры</Link>
              </li>
              <li>
                <Link to="/trainingSchedule">Расписание</Link>
              </li>
              <li>
                <Link to="/tournaments">Турниры</Link>
              </li>
              <li>
                <Link to="/corporates">Корпоративные мероприятия</Link>
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
          <div className={styles.dropdown}>
            <span className={styles.dropdown_title}>Пляжный волейбол</span>
            <ClosedIcon className={styles.dropdown_closed} />
            <div className={styles.dropdown_content}>
              <ul className={styles.dropdown_menu}>
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
                  <Link to="/allCoahes">Тренеры</Link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.dropdown}>
            <span className={styles.dropdown_title}>Классический волейбол</span>
            <ClosedIcon className={styles.dropdown_closed} />
            <div className={styles.dropdown_content}>
              <ul className={styles.dropdown_menu}>
                <li>
                  <Link to="/trainingSchedule">Расписание</Link>
                </li>
                <li>
                  <Link to="/tournaments">Турниры</Link>
                </li>
                <li>
                  <Link to="/corporates">Корпоративные мероприятия</Link>
                </li>
                <li>
                  <Link to="/allCoahes">Тренеры</Link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <Link to="/about">О нас</Link>
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
