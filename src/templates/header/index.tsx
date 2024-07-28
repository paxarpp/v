import ReactLogo from '../../assets/logo.svg?react'
import Vk from '../../assets/vk.svg?react'
import T from '../../assets/t.svg?react'
import Inst from '../../assets/inst.svg?react'
import styles from './index.module.css'

export const Header = () => {
  return (
    <div className={styles.header}>
      <ul className={styles.menu}>
        <li>
          <a href="/"> <ReactLogo /></a>
        </li>
        <li>
          <a href="/weekendCamps">Кемпы на выходные</a>
        </li>
        <li>
          <a href="/campsLong">Кемпы длинные</a>
        </li>
        <li>
          <a href="/trainingSchedule">Расписание тренировок</a>
        </li>
        <li>
          <a href="/about">О нас</a>
        </li>
        <li>
          <a href="/coaches">Тренеры</a>
        </li>
      </ul>
      <div className={styles.icons}>
        <Vk />
        <T />
        <Inst />
      </div>
      <button className={styles.button}>Войти</button>
    </div>
  );

}