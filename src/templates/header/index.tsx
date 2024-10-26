import Logo from '../../assets/logo.svg?react'
import Vk from '../../assets/vk.svg?react'
import T from '../../assets/t.svg?react'
import Inst from '../../assets/inst.svg?react'
import { logout } from '../../api'
import { useContext } from 'react'
import { AuthContext } from '../../context'
import styles from './index.module.css'

export const Header: React.FC<{ toggleAuthOpen: () => void }> = ({ toggleAuthOpen }) => {
  const authCtx = useContext(AuthContext);
  const isAuth = !!authCtx.user;

  const onLogout = () => { 
    logout();
    document.cookie = `magicVolley=;`;
    if (authCtx.setUser) {
      authCtx.setUser(null);
    }
  }
  return (
    <div className={styles.header}>
      <ul className={styles.menu}>
        <li>
          <a href="/"><Logo /></a>
        </li>
        <li>
          <a href="/weekendCamps">Кемпы на выходные</a>
        </li>
        <li>
          <a href="/longCamps">Кемпы длинные</a>
        </li>
        <li>
          <a href="/trainingSchedule">Расписание тренировок</a>
        </li>
        <li>
          <a href="/about">О нас</a>
        </li>
        <li>
          <a href="/allCoahes">Тренеры</a>
        </li>
      </ul>
      <div className={styles.icons}>
        <Vk />
        <T />
        <Inst />
      </div>
      <button className={styles.button} onClick={isAuth ? onLogout : toggleAuthOpen}>{isAuth ? 'Выйти' : 'Войти'}</button>
    </div>
  );

}