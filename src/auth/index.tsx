import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

export const Auth: React.FC<{ toggleAuthOpen: () => void }> = ({ toggleAuthOpen }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [stylesM, setStylesM] = useState({ left: 0, top: 0});
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (ref?.current) {
      const { height, width } = ref.current.getBoundingClientRect();
      setStylesM({
        left: (window.innerWidth - width) / 2,
        top: (window.innerHeight - height) / 2,
      })
    }
  }, [ref]);

  const onChangeTel = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && /^\+?|[0-9]|[\(][0-9]|[0-9][|)]/g.test(e.target.value)) {
      setTel(e.target.value);
    } else  if (!e.target.value) {
      setTel('');
    }
    setValidationError('');
  };

  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onEnter = () => {
    const pattern = /([\+]?[7|8][\s-(]?[9][0-9]{2}[\s-)]?)?([\d]{3})[\s-]?([\d]{2})[\s-]?([\d]{2})/;
    if (tel && password) {
      if (pattern.test(tel)) {
        toggleAuthOpen();
      } else {
        setValidationError('Неверный формат телефона');
      }
    }
  }


  return (
    <div className={styles.modal_wrap} style={stylesM}>
      <div className={styles.modal_back} />
      <div className={styles.modal} ref={ref}>
        <span className={styles.modal_title}>Вход в личный кабинет</span>
        <div className={styles.input_wrap}>
          <input
            type='tel'
            placeholder="8 123 456 8901"
            className={`${styles.modal_input} ${validationError ? styles.input_validation_error : ''}`}
            value={tel}
            onChange={onChangeTel}
          />
          {validationError ? <span className={styles.validation_error}>{validationError}</span> : null}
        </div>
        <input
          type='password'
          className={`${styles.modal_input} ${styles.mt_30}`}
          value={password}
          onChange={onChangePass}
        />
        <button className={styles.auth_button} onClick={onEnter}>Войти</button>
      </div>
    </div>
  );
}