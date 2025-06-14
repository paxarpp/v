import { Link, NavLink } from 'react-router';
import Logo from '../../assets/logo.svg?react';
import Burger from '../../assets/burger.svg?react';
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
  togglePopapMenu: () => void;
  toggleAuthOpen: () => void;
  toggleNotificationModal: () => void;
  isOpenPopapMenu: boolean;
  count: number;
}

export const MobileTemplate: React.FC<IProps> = ({
  linkInstagram,
  linkTg,
  linkVk,
  togglePopapMenu,
  toggleAuthOpen,
  toggleNotificationModal,
  isOpenPopapMenu,
  count,
}) => {
  const { user, isAdmin } = useUser();
  const isAuth = !!user;
  return (
    <>
      <div className={styles.stub_header_mobile}>
        {isOpenPopapMenu ? (
          <div className={styles.popap_menu} onClick={togglePopapMenu}>
            <span>Пляжный волейбол</span>
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
                <NavLink to="/beachCoaches" className={createLinkClassName}>
                  Тренеры
                </NavLink>
              </li>
            </ul>
            <span>Классический волейбол</span>
            <ul className={styles.menu_popap}>
              <li>
                <NavLink to="/trainingSchedule" className={createLinkClassName}>
                  Расписание
                </NavLink>
              </li>
              <li>
                <NavLink to="/classicCoaches" className={createLinkClassName}>
                  Тренеры
                </NavLink>
              </li>
            </ul>
            <ul className={styles.menu_popap}>
              <li>
                <NavLink to="/childCamps" className={createLinkClassName}>
                  Детские кемпы
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={createLinkClassName}>
                  О нас
                </NavLink>
              </li>
            </ul>
            {isAuth ? (
              <>
                {isAdmin ? (
                  <span className={styles.user_bell}>
                    {count !== 0 ? (
                      <span className={styles.notifications_count}>
                        {count}
                      </span>
                    ) : null}
                    <Bell onClick={toggleNotificationModal} />
                  </span>
                ) : null}
                <Link
                  to={`/user/${(user as unknown as IUser).id}`}
                  className={styles.user_avatar}
                >
                  <Avatar />
                </Link>
              </>
            ) : (
              <button
                className={styles.button_mobi}
                onClick={() => toggleAuthOpen()}
              >
                {'Войти'}
              </button>
            )}
          </div>
        ) : null}
      </div>
      <div className={styles.header_mobile}>
        <NavLink
          to="/"
          className={({ isPending }) => (isPending ? styles.link_pending : '')}
        >
          <Logo className={styles.logo_mobile} />
        </NavLink>
        <div className={styles.icons_mobile}>
          <a href={linkVk} target={'_blank'}>
            <Vk className={styles.icon_mobile} />
          </a>
          <a href={createLinkTg(linkTg)} target={'_blank'}>
            <T className={styles.icon_mobile} />
          </a>
          <a href={linkInstagram} target={'_blank'}>
            <Inst className={styles.icon_mobile} />
          </a>
        </div>
        <div className={styles.burger}>
          <Burger onClick={togglePopapMenu} />
        </div>
      </div>
    </>
  );
};
