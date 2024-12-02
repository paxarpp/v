import React, { useState } from 'react';
import styles from './index.module.css';
import { Modal } from '../templates/modal';
import { login } from '../api';
import { IUser } from './interface';
import { useUser } from '../context';
import { InputStyled } from '../templates/input';

export const Auth: React.FC<{
  onCloseAuth: () => void;
  toggleAuthOpen: () => void;
}> = ({ onCloseAuth, toggleAuthOpen }) => {
  const { signin } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const authing = (l: string, p: string) => {
    const authLogin = async () => {
      const user = await login<{
        data?: IUser & { cookie: string };
      }>(l, p);
      if (user?.data) {
        signin(user.data);
        toggleAuthOpen();
        try {
          localStorage.setItem('user', JSON.stringify(user.data));
        } catch (e) {
          //
        }
      }
    };
    authLogin();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setUsername(e.target.value);
    } else if (!e.target.value) {
      setUsername('');
    }
  };

  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onEnter = () => {
    if (username && password) {
      authing(username, password);
    }
  };

  return (
    <Modal
      isOpen={true}
      close={onCloseAuth}
      header={<h2>{'Вход в личный кабинет'}</h2>}
      footer={
        <button className={styles.auth_button} onClick={onEnter}>
          Войти
        </button>
      }
    >
      <div className={styles.input_wrap}>
        <InputStyled
          placeholder={'Логин'}
          // className={styles.modal_input}
          value={username}
          onChange={onChange}
        />
        <InputStyled
          placeholder={'Пароль'}
          type="password"
          // className={`${styles.modal_input} ${styles.mt_30}`}
          value={password}
          onChange={onChangePass}
        />
      </div>
    </Modal>
  );
};
