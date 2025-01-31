import { Link, NavLink } from 'react-router';
import Logo from '../../assets/logo.svg?react';
import ClosedIcon from '../../assets/closed.svg?react';
import Vk from '../../assets/vk.svg?react';
import T from '../../assets/t.svg?react';
import Inst from '../../assets/inst.svg?react';
import Avatar from '../../assets/avatar.svg?react';
import Bell from '../../assets/bell.svg?react';
import { useUser } from '../../context';
import { IUser } from '../../auth/interface';
import { createLinkTg } from '../../constants';
import { createLinkClassName, IProps as IPropsBase } from '.';
import styles from './index.module.css';

interface IProps extends IPropsBase {
  toggleAuthOpen: () => void;
  toggleNotificationModal: () => void;
  count: number;
}

export const Template: React.FC<IProps> = ({
  linkInstagram,
  linkTg,
  linkVk,
  toggleAuthOpen,
  toggleNotificationModal,
  count,
}) => {
  const { user, isAdmin } = useUser();
  const isAuth = !!user;
  return (
    <div className={styles.header}>
      <ul className={styles.menu}>
        <li className={styles.logo_height}>
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
                  <NavLink to="/classicCoaches" className={createLinkClassName}>
                    Тренеры
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <NavLink to="/childCamps" className={createLinkClassName}>
            Детские кэмпы
          </NavLink>
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
        <>
          {isAdmin ? (
            <span className={styles.user_bell}>
              {count !== 0 ? (
                <span className={styles.notifications_count}>{count}</span>
              ) : null}
              <Bell onClick={toggleNotificationModal} />
            </span>
          ) : null}
          <Link
            to={`/user/${(user as unknown as IUser).id}`}
            className={
              isAdmin ? styles.user_avatar : styles.user_avatar_without_bell
            }
          >
            <Avatar />
          </Link>
        </>
      ) : (
        <button className={styles.button} onClick={() => toggleAuthOpen()}>
          {'Войти'}
        </button>
      )}
    </div>
  );
};
