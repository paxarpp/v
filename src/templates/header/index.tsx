import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg?react';
import Vk from '../../assets/vk.svg?react';
import T from '../../assets/t.svg?react';
import Inst from '../../assets/inst.svg?react';
import { logout } from '../../api';
import { useContext } from 'react';
import { AuthContext } from '../../context';
import styles from './index.module.css';

export const Header: React.FC<{ toggleAuthOpen: () => void }> = ({ toggleAuthOpen }) => {
  const authCtx = useContext(AuthContext);
  const isAuth = !!authCtx.user;

  const onLogout = () => {
    logout();
    document.cookie = `magicVolley=;`;
    if (authCtx.setUser) {
      authCtx.setUser(null);
    }
  };
  return (
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
      <button className={styles.button} onClick={isAuth ? onLogout : toggleAuthOpen}>
        {isAuth ? 'Выйти' : 'Войти'}
      </button>
    </div>
  );
};
