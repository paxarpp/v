import { useState } from 'react';
import { InputStyled } from '../input';
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
          <InputStyled
            className={styles.modal_input}
            value={name}
            onChange={onChangeName}
            placeholder={'Имя'}
          />
          <InputStyled
            type="tel"
            className={styles.modal_input}
            value={tel}
            onChange={onChangeTel}
            placeholder={'Телефон'}
            validationError={validationError}
          />
        </div>
        <InputStyled
          className={styles.modal_input_long}
          value={comment}
          onChange={onChangeComment}
          placeholder={'Комментарий'}
        />
        <button className={styles.button} onClick={onSend}>
          Отправить
        </button>
      </div>
    </div>
  );
};
