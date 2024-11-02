import { useState } from 'react';
import styles from './index.module.css';

export const CallMe = () => {
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
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
      <div>
        <input
          className={styles.modal_input}
          value={name}
          onChange={onChangeName}
        />
        <input
          type="tel"
          placeholder="8 123 456 8901"
          className={`${styles.modal_input} ${styles.mlr_30} ${validationError ? styles.input_validation_error : ''}`}
          value={tel}
          onChange={onChangeTel}
        />
        {validationError ? (
          <span className={styles.validation_error}>{validationError}</span>
        ) : null}
        <button className={styles.button} onClick={onSend}>
          Отправить
        </button>
      </div>
    </div>
  );
};
