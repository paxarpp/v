import Actions from '../../assets/actions.svg?react'
import Best from '../../assets/best.svg?react'
import Right from '../../assets/right.svg?react'
import styles from './index.module.css'

export const BlockIcons = () => {
  return (
    <div className={styles.block_icons}>
      <div className={styles.block_icon}>
        <Best />
        <span className={styles.icon_title}>Лучшая команда</span>
        <span className={styles.icon_sub_title}>Работаем 24/7 для общего результата</span>
      </div>
      <div className={styles.block_icon}>
        <Best />
        <span className={styles.icon_title}>Правильный подход</span>
        <span className={styles.icon_sub_title}>Ставим цели и идем вместе к ним</span>
      </div>
      <div className={styles.block_icon}>
        <Best />
        <span className={styles.icon_title}>Действия, а не слова</span>
        <span className={styles.icon_sub_title}>Слова ценятся тогда, когда совпадают с действиями</span>
      </div>
    </div>
  )
}