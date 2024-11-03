import { useState } from 'react';
import styles from './index.module.css';

export const CallMe = () => {
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [comment, setComment] = useState('');
  const [validationError, setValidationError] = useState('');

  const onChangeTel = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value &&
      /^\+?|[0-9]|[\(][0-9]|[0-9][|)]/g.test(e.target.value)
    ) {
      setTel(e.target.value);
    } else if (!e.target.value) {
      setTel('');
    }
    setValidationError('');
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const onSend = () => {
    const pattern =
      /([\+]?[7|8][\s-(]?[9][0-9]{2}[\s-)]?)?([\d]{3})[\s-]?([\d]{2})[\s-]?([\d]{2})/;
    if (tel && name) {
      if (pattern.test(tel)) {
        //
      } else {
        setValidationError('Неверный формат телефона');
      }
    }
  };
  return (
    <div className={styles.wrapper}>
      <h2>Остались вопросы?</h2>
      <p>Оставьте свой номер телефона и мы свяжемся с вами!</p>
      <div className={styles.col_inputs}>
        <div className={styles.row_input}>
          <span className={styles.input_wrapper}>
            <input
              className={styles.modal_input}
              value={name}
              onChange={onChangeName}
            />
            <span className={styles.placeholder}>Имя</span>
          </span>
          <span className={styles.input_wrapper}>
            <input
              type="tel"
              className={`${styles.modal_input} ${validationError ? styles.input_validation_error : ''}`}
              value={tel}
              onChange={onChangeTel}
            />
            {validationError ? (
              <span className={styles.validation_error}>{validationError}</span>
            ) : null}
            <span className={styles.placeholder}>Телефон</span>
          </span>
        </div>
        <span className={`${styles.input_wrapper} ${styles.mt_30}`}>
          <input
            className={styles.modal_input_long}
            value={comment}
            onChange={onChangeComment}
          />
          <span className={styles.placeholder}>Комментарий</span>
        </span>
        <button className={styles.button} onClick={onSend}>
          Отправить
        </button>
      </div>
    </div>
  );
};
