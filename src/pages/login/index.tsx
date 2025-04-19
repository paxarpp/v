import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { api } from '../../api/api';
import { useUser } from '../../context';
import { TemplateSiginP } from '../../auth/templateSignInP';
import { TemplateLogin } from '../../auth/templateLogin';
import styles from './index.module.css';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  return { login: [], error: false };
}

export default function Login() {
  const { signin, user } = useUser();

  const [tab, setTab] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const authing = () => {
    const authLogin = async () => {
      const user = await api.login<{
        data?: unknown & { cookie: string };
      }>(username, password);
      if (user?.data?.id) {
        signin(user.data);
        // toggleAuthOpen();
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
        data?: unknown & { cookie: string };
      }>(username, password, telephone, confirmPassword);
      if (user?.data?.id) {
        signin(user.data);
        // toggleAuthOpen();
        try {
          localStorage.setItem('user', JSON.stringify(user.data));
        } catch (e) {
          //
        }
      }
    };
    authSign();
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

  const onSignin = () => {
    if (username && password) {
      authing();
    }
  };

  const onLogin = () => {
    if (username && password && password === confirmPassword) {
      sign();
    }
  };

  return user ? (
    <Navigate to="/" replace />
  ) : tab === 1 ? (
    <div className={styles.page_login}>
      <span>{'Вход в личный кабинет'}</span>
      <TemplateSiginP
        onChange={onChange}
        onChangePassword={onChangePass}
        username={username}
        password={password}
        className={styles.wrap_sigin}
      />
      <div className={styles.row_buttons}>
        <button className={styles.auth_button} onClick={onSignin}>
          Войти
        </button>
        <button className={styles.auth_button} onClick={() => setTab(2)}>
          Регистрация
        </button>
      </div>
    </div>
  ) : (
    <div className={styles.page_login}>
      <span onClick={() => setTab(1)} className={styles.text_signin}>
        Вход
      </span>
      <span>Регистрация</span>
      <TemplateLogin
        onChange={onChange}
        onChangeTelephone={onChangeTelephone}
        username={username}
        telephone={telephone}
        onChangePass={onChangePass}
        onChangeConfPass={onChangeConfPass}
        password={password}
        confirmPassword={confirmPassword}
      />
      <button className={styles.auth_button} onClick={onLogin}>
        Зарегистрироваться
      </button>
    </div>
  );
}
