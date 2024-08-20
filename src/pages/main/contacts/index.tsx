import Point from '../../../assets/point.svg?react'
import Phone from '../../../assets/phone.svg?react'
import Mail from '../../../assets/mail.svg?react'
import Vk from '../../../assets/vk.svg?react'
import T from '../../../assets/t.svg?react'
import Inst from '../../../assets/inst.svg?react'
import styles from '../index.module.css';

export const Contacts = () => {
  return (
    <div>
      <h3>Контакты</h3>
      <div className={styles.flex}>
        <div>
          <div className={styles.contact}>
            <Point />
            <span>Рязанская область, Спасский район, Панинское сельское поселение, деревня Сумбулово, Сосновая улица</span>
          </div>
          <div className={styles.contact}>
            <Phone />
            <span>+7 (996) 910-30-47 Пн-Вс с 10:00 до 21:00</span>
          </div>
          <div className={styles.contact}>
            <Mail />
            <span>volleymagic@mail.ru</span>
          </div>
          <div  className={styles.mt_20}>
            <Vk /> <T  className={styles.contact_icon} /> <Inst />
          </div>
        </div>
        <div>
          <img className={styles.map}src={'src/assets/map.jpg'} alt="map" />
        </div>
      </div>
    </div>

  )
}