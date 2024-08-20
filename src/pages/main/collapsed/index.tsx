import {useState, SyntheticEvent} from'react';
import ClosedIcon from '../../../assets/closed.svg?react';
import OpenedIcon from '../../../assets/opened.svg?react';
import styles from '../index.module.css';

export const Collapsed = () => {
  const [openId, setIsOpen] = useState<string|null>(null);

  const onClick = (e: SyntheticEvent<EventTarget>) => {
    const currentId = (e.target as unknown as { dataset: { id: string }}).dataset.id
    setIsOpen(openId === currentId ? null : currentId);
  }
  return (
    <div className={styles.asked_questions}>
      <h2 className={styles.main_title}>Часто задаваемые вопросы</h2>
      <div onClick={onClick}>
        <div className={styles.question}>
          <span data-id={'1'} className={styles.question_name}>Есть ли у вас рассрочка на спорт-пакет?</span>
          {openId === '1' ? <OpenedIcon /> : <ClosedIcon />}
          <div className={openId === '1' ? styles.info_open : styles.info_close}>
            <span className={styles.question_message}>
              У нас к каждому участнику индивидуальный подход во всем - оплата не исключение!Если у тебя нет возможности до начала кемпа внести всю сумму спортпакета, то напиши нам и мы предложим тебе варианты оплаты!
            </span>
          </div>
        </div>
        <div>
          <span data-id={'2'}>Организовываете ли вы трансфер до места проведения сбора?</span>
          {openId === '2' ? <OpenedIcon /> : <ClosedIcon />}
          <div className={openId === '2' ? styles.info_open : styles.info_close}>
            <span>
              У нас к каждому участнику индивидуальный подход во всем - оплата не исключение!Если у тебя нет возможности до начала кемпа внести всю сумму спортпакета, то напиши нам и мы предложим тебе варианты оплаты!
            </span>
          </div>
        </div>
        <div>
          <span data-id={'3'}>Какого уровня будут участники на кемпе?</span>
          {openId === '3' ? <OpenedIcon /> : <ClosedIcon />}
          <div className={openId === '3' ? styles.info_open : styles.info_close}>
            <span>
              У нас к каждому участнику индивидуальный подход во всем - оплата не исключение!Если у тебя нет возможности до начала кемпа внести всю сумму спортпакета, то напиши нам и мы предложим тебе варианты оплаты!
            </span>
          </div>
        </div>
        <div>
          <span data-id={'4'}>Кто будет проводить тренировки? Какой тенер?</span>
          {openId === '4' ? <OpenedIcon /> : <ClosedIcon />}
          <div className={openId === '4' ? styles.info_open : styles.info_close}>
            <span>
              У нас к каждому участнику индивидуальный подход во всем - оплата не исключение!Если у тебя нет возможности до начала кемпа внести всю сумму спортпакета, то напиши нам и мы предложим тебе варианты оплаты!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}