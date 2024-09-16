import React, { useState } from 'react';
import styles from './index.module.css';
import { Modal } from '../templates/modal';
import { login } from '../api';

export const Auth: React.FC<{ toggleAuthOpen: () => void }> = ({ toggleAuthOpen }) => {
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setTel(e.target.value);
    } else  if (!e.target.value) {
      setTel('');
    }
  };

  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onEnter = () => {
    if (tel && password) {
      toggleAuthOpen();
      login(tel, password)
    }
  }

  return (
    <Modal
      isOpen={true}
      title={'Вход в личный кабинет'}
      footer={<button className={styles.auth_button} onClick={onEnter}>Войти</button>}
    >
        <div className={styles.input_wrap}>
          <input
            className={styles.modal_input}
            value={tel}
            onChange={onChange}
          />
        </div>
        <input
          type='password'
          className={`${styles.modal_input} ${styles.mt_30}`}
          value={password}
          onChange={onChangePass}
        />
    </Modal>
  );
}