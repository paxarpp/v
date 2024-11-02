import Phone from '../../../assets/phone.svg?react';
import Mail from '../../../assets/mail.svg?react';
import Vk from '../../../assets/vk.svg?react';
import T from '../../../assets/t.svg?react';
import Inst from '../../../assets/inst.svg?react';
import styles from '../index.module.css';

export const Contacts = () => {
  return (
    <div>
      <h3>Контакты</h3>
      <div className={styles.flex}>
        <div className={styles.contact_wrap}>
          <div className={styles.contact}>
            <Phone />
            <span>
              +7 (996) 910-30-47, +7 (996) 910-30-47 Пн-Вс с 10:00 до 21:00
            </span>
          </div>
          <div className={styles.contact}>
            <Mail />
            <span>volleymagic@mail.ru</span>
          </div>
          <div className={styles.mt_20}>
            <Vk /> <T className={styles.contact_icon} /> <Inst />
          </div>
        </div>
        <div className={styles.manager_wrap}>
          <div className={styles.img_wrap}>
            <img
              className={styles.manager}
              src={'src/assets/manager.png'}
              alt="manager"
            />
          </div>
          <span>Ваш менеджер – Татьяна</span>
        </div>
      </div>
    </div>
  );
};
