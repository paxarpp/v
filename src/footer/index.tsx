import Logo from '../assets/logo.svg?react'
import Vk from '../assets/vk.svg?react'
import T from '../assets/t.svg?react'
import Inst from '../assets/inst.svg?react'
import styles from './index.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Logo />
      <div>
        <span className={styles.menu_title}>Кемпы и тренировки</span>
        <ul className={styles.menu}>
          <li>
            <a href="/weekendCamps">Кемпы на выходные</a>
          </li>
          <li>
            <a href="/campsLong">Кемпы длинные</a>
          </li>
          <li>
            <a href="/trainingSchedule">Расписание тренировок</a>
          </li>
        </ul>
      </div>
      <div>
        <span className={styles.menu_title}>О школе</span>
        <ul className={styles.menu}>
          <li>
            О нас
          </li>
          <li>
            Отзывы
          </li>
          <li>
            Часто задаваемые вопросы
          </li>
          <li>
            Тренеры
          </li>
        </ul>
      </div>
      <div>
        <Vk className={styles.icon} />
        <T className={`${styles.icon} ${styles.mlr_20}`} />
        <Inst className={styles.icon} />
      </div>
    </footer>
  );
}