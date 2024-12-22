import React, { useState } from 'react';
import styles from './index.module.css';
import { Modal } from '../templates/modal';
import { api } from '../api/api';
import { IUser } from './interface';
import { useUser } from '../context';
import { InputStyled } from '../templates/input';

export const Auth: React.FC<{
  onCloseAuth: () => void;
  toggleAuthOpen: (campId?: string) => void;
  campId?: string;
}> = ({ onCloseAuth, toggleAuthOpen, campId }) => {
  const { signin } = useUser();
  const [tab, setTab] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const authing = () => {
    const authLogin = async () => {
      const user = await api.login<{
        data?: IUser & { cookie: string };
      }>(username, password);
      if (user?.data?.id) {
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

  const sign = () => {
    const authSign = async () => {
      const user = await api.signup<{
        data?: IUser & { cookie: string };
      }>(username, password, telephone, confirmPassword);
      if (user?.data?.id) {
        signin(user.data);
        toggleAuthOpen();
        try {
          localStorage.setItem('user', JSON.stringify(user.data));
        } catch (e) {
          //
        }
      }
    };
    authSign();
  };

  const reserv = () => {
    const reserved = async () => {
      await api.campReservationWithoutUser(
        campId as string,
        username,
        telephone,
      );
    };
    reserved();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value || '');
  };
  const onChangeTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelephone(e.target.value || '');
  };

  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeConfPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const onEnter = () => {
    if (tab === 1) {
      if (username && password) {
        authing();
      }
    } else if (!campId) {
      if (username && password && password === confirmPassword) {
        sign();
      }
    } else if (campId) {
      if (username && telephone) {
        reserv();
      }
    }
  };

  return (
    <Modal
      isOpen={true}
      close={onCloseAuth}
      header={
        <div className={styles.header}>
          <span
            className={tab === 1 ? styles.current_header : ''}
            onClick={() => setTab(1)}
          >
            {'Вход в личный кабинет'}
          </span>
          <span
            className={tab !== 1 ? styles.current_header : ''}
            onClick={() => setTab(2)}
          >
            {campId ? 'Продолжить без регистрации' : 'Регистрация'}
          </span>
        </div>
      }
      footer={
        <button className={styles.auth_button} onClick={onEnter}>
          {tab === 1
            ? 'Войти'
            : campId
              ? 'Забронировать'
              : 'Зарегистрироваться'}
        </button>
      }
    >
      <div className={styles.tab_login}>
        {tab === 1 ? (
          <div className={styles.input_wrap}>
            <InputStyled
              placeholder={'Логин'}
              value={username}
              onChange={onChange}
            />
            <InputStyled
              placeholder={'Пароль'}
              type="password"
              value={password}
              onChange={onChangePass}
            />
          </div>
        ) : null}
      </div>
      <div className={styles.tab_registration}>
        {tab !== 1 ? (
          campId ? (
            <div className={styles.input_wrap}>
              <InputStyled
                placeholder={'Имя'}
                value={username}
                onChange={onChange}
              />
              <InputStyled
                placeholder={'Телефон'}
                value={telephone}
                onChange={onChangeTelephone}
              />
            </div>
          ) : (
            <div className={styles.input_wrap}>
              <InputStyled
                placeholder={'Имя'}
                value={username}
                onChange={onChange}
              />
              <InputStyled
                placeholder={'Телефон'}
                value={telephone}
                onChange={onChangeTelephone}
              />
              <InputStyled
                placeholder={'Пароль'}
                value={password}
                onChange={onChangePass}
                type="password"
              />
              <InputStyled
                placeholder={'Подтверждение пароля'}
                value={confirmPassword}
                onChange={onChangeConfPass}
                type="password"
              />
            </div>
          )
        ) : null}
      </div>
    </Modal>
  );
};
