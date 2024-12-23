import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../../assets/logo.svg?react';
import Burger from '../../assets/burger.svg?react';
import Vk from '../../assets/vk.svg?react';
import T from '../../assets/t.svg?react';
import ClosedIcon from '../../assets/closed.svg?react';
import Inst from '../../assets/inst.svg?react';
import Avatar from '../../assets/avatar.svg?react';
import { useUser, useAuth } from '../../context';
import { useDeviceDetect } from '../../hooks';
import { getCookie } from '../../cookie';
import { IUser } from '../../auth/interface';
import { createLinkTg } from '../../constants';
import { api } from '../../api/api';
import { AxiosError } from 'axios';
import styles from './index.module.css';

interface IProps {
  linkTg: string;
  linkInstagram: string;
  linkVk: string;
}

const createLinkClassName = ({
  isPending,
  isActive,
}: {
  isPending: boolean;
  isActive: boolean;
}) => (isPending ? styles.link_pending : isActive ? styles.link_active : '');

export const Header: React.FC<IProps> = ({ linkTg, linkInstagram, linkVk }) => {
  const { user, isAdmin, signin } = useUser();
  const { toggleAuthOpen } = useAuth();
  const isAuth = !!user;
  const { isMobile } = useDeviceDetect();
  const [isOpenPopapMenu, openPopapMenu] = useState(false);
  const [count, setNotif] = useState<number>(0);
  const tN = useRef<number | undefined>(undefined);

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

  useEffect(() => {
    if (isAdmin && !tN.current) {
      const getNotif = async () => {
        try {
          const { data } = await api.notification.getNotificationCount();

          if (data?.result !== null) {
            setNotif(data.result);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
              clearInterval(tN.current);
            }
          }
        }
      };
      const timer = setInterval(getNotif, 10000);
      tN.current = timer;
    } else if (!isAdmin && tN.current) {
      clearInterval(tN.current);
    }
    return () => {
      clearInterval(tN.current);
    };
  }, [isAdmin]);

  const togglePopapMenu = () => {
    openPopapMenu((prev) => !prev);
  };

  return isMobile ? (
    <div className={styles.header_mobile}>
      <NavLink
        to="/"
        className={({ isPending }) => (isPending ? styles.link_pending : '')}
      >
        <Logo />
      </NavLink>
      <div className={styles.icons_mobile}>
        <a href={linkVk} target={'_blank'}>
          <Vk />
        </a>
        <a href={createLinkTg(linkTg)} target={'_blank'}>
          <T />
        </a>
        <a href={linkInstagram} target={'_blank'}>
          <Inst />
        </a>
      </div>
      <div className={styles.burger}>
        <Burger onClick={togglePopapMenu} />
        {isOpenPopapMenu ? (
          <div className={styles.popap_menu} onClick={togglePopapMenu}>
            <ul className={styles.menu_popap}>
              <li>
                <NavLink to="/weekendCamps" className={createLinkClassName}>
                  Кемпы выходного дня
                </NavLink>
              </li>
              <li>
                <NavLink to="/longCamps" className={createLinkClassName}>
                  Недельные кемпы
                </NavLink>
              </li>
              <li>
                <NavLink to="/oldCamps" className={createLinkClassName}>
                  Прошедшие кемпы
                </NavLink>
              </li>
              <li>
                <NavLink to="/allCoahes" className={createLinkClassName}>
                  Тренеры
                </NavLink>
              </li>
              <li>
                <NavLink to="/trainingSchedule" className={createLinkClassName}>
                  Расписание
                </NavLink>
              </li>
              <li>
                <NavLink to="/tournaments" className={createLinkClassName}>
                  Турниры
                </NavLink>
              </li>
              <li>
                <NavLink to="/corporates" className={createLinkClassName}>
                  Корпоративные мероприятия
                </NavLink>
              </li>
            </ul>
            {isAuth ? (
              <Link
                to={`/user/:${(user as unknown as IUser).id}`}
                className={styles.user_avatar}
              >
                <Avatar />
              </Link>
            ) : (
              <button
                className={styles.button}
                onClick={() => toggleAuthOpen()}
              >
                {'Войти'}
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <div className={styles.header}>
      <ul className={styles.menu}>
        <li>
          <NavLink to="/" className={createLinkClassName}>
            <Logo />
          </NavLink>
        </li>
        <li>
          <div className={styles.dropdown}>
            <span>Пляжный волейбол</span>
            <ClosedIcon className={styles.dropdown_closed} />
            <div className={styles.dropdown_content}>
              <ul className={styles.dropdown_menu}>
                <li>
                  <NavLink to="/weekendCamps" className={createLinkClassName}>
                    Кемпы выходного дня
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/longCamps" className={createLinkClassName}>
                    Недельные кемпы
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/oldCamps" className={createLinkClassName}>
                    Прошедшие кемпы
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/beachCoaches" className={createLinkClassName}>
                    Тренеры
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.dropdown}>
            <span>Классический волейбол</span>
            <ClosedIcon className={styles.dropdown_closed} />
            <div className={styles.dropdown_content}>
              <ul className={styles.dropdown_menu}>
                <li>
                  <NavLink
                    to="/trainingSchedule"
                    className={createLinkClassName}
                  >
                    Расписание
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/tournaments" className={createLinkClassName}>
                    Турниры
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/corporates" className={createLinkClassName}>
                    Корпоративные мероприятия
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/classicCoaches" className={createLinkClassName}>
                    Тренеры
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <NavLink to="/about" className={createLinkClassName}>
            О нас
          </NavLink>
        </li>
      </ul>
      <div className={styles.icons}>
        <a href={linkVk} target={'_blank'}>
          <Vk />
        </a>
        <a href={createLinkTg(linkTg)} target={'_blank'}>
          <T />
        </a>
        <a href={linkInstagram} target={'_blank'}>
          <Inst />
        </a>
      </div>
      {isAuth ? (
        <Link
          to={`/user/${(user as unknown as IUser).id}`}
          className={`${styles.user_avatar} ${styles.auth_block}`}
        >
          <Avatar />
          {isAdmin && count !== 0 ? (
            <span className={styles.notifications_count}>{count}</span>
          ) : null}
        </Link>
      ) : (
        <button className={styles.button} onClick={() => toggleAuthOpen()}>
          {'Войти'}
        </button>
      )}
    </div>
  );
};
