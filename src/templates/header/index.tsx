import Logo from '../../assets/logo.svg?react'
import Vk from '../../assets/vk.svg?react'
import T from '../../assets/t.svg?react'
import Inst from '../../assets/inst.svg?react'
import styles from './index.module.css'

export const Header: React.FC<{ toggleAuthOpen: () => void }> = ({ toggleAuthOpen }) => {
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
      <button className={styles.button} onClick={toggleAuthOpen}>Войти</button>
    </div>
  );

}