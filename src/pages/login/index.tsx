import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { api } from '../../api/api';
import { useUser } from '../../context';
import { TemplateSiginT } from '../../auth/templateSignInT';
import { TemplateLogin } from '../../auth/templateLogin';
import styles from './index.module.css';
import { applyMask, PHONE_MASK } from '../../constants';

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
  const [validationError, setValidationError] = useState('');

  const authing = () => {
    const authLogin = async () => {
      const user = await api.login<{
        data?: unknown & { cookie: string };
      }>(telephone, password);
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

  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeConfPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const onSignin = () => {
    if (telephone && password) {
      authing();
    }
  };

  const onLogin = () => {
    if (username && password && password === confirmPassword) {
      sign();
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!inputValue || inputValue === PHONE_MASK) {
      setTelephone('');
      setValidationError('');
      return;
    }
    const newNumbers = inputValue.replace(/\D/g, '');
    const numbersWith7 = newNumbers.startsWith('7')
      ? newNumbers
      : '7' + newNumbers;
    const limitedNumbers = numbersWith7.slice(0, 11);
    e.target.value = limitedNumbers;
    setTelephone(e.target.value);
    setValidationError('');
  };

  // Отображаем маску только если есть введенные цифры
  const displayValueTel = telephone
    ? applyMask(telephone.slice(1))
    : PHONE_MASK;

  return user ? (
    <Navigate to="/" replace />
  ) : tab === 1 ? (
    <div className={styles.page_login}>
      <span>{'Вход в личный кабинет'}</span>
      <TemplateSiginT
        onChangePassword={onChangePass}
        handlePhoneChange={handlePhoneChange}
        displayValueTel={displayValueTel}
        validationError={validationError}
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
        username={username}
        handlePhoneChange={handlePhoneChange}
        displayValueTel={displayValueTel}
        validationError={validationError}
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
