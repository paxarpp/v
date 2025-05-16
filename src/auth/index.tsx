import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { Modal } from '../templates/modal';
import { api } from '../api/api';
import { IUser } from './interface';
import { useUser } from '../context';
import { useDeviceDetect } from '../hooks';
import { TemplateSiginT } from './templateSignInT';
import { TemplateSiginN } from './templateSignInN';
import { TemplateLogin } from './templateLogin';
import { applyMask, PHONE_MASK } from '../constants';
import styles from './index.module.css';

export const Auth: React.FC<{
  onCloseAuth: () => void;
  toggleAuthOpen: (campId?: string) => void;
  campId?: string;
}> = ({ onCloseAuth, toggleAuthOpen, campId }) => {
  const { signin } = useUser();
  const { isMobile } = useDeviceDetect();
  const [tab, setTab] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const authing = () => {
    const authLogin = async () => {
      const user = await api.login<{
        data?: IUser & { cookie: string };
      }>(telephone, password);
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

  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeConfPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const onEnter = () => {
    if (tab === 1) {
      if (telephone && password) {
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

  if (isMobile) {
    return <Navigate to="/login" replace />;
  }

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
    >
      <div className={styles.tab_login}>
        {tab === 1 ? (
          <>
            <TemplateSiginT
              onChangePassword={onChangePass}
              handlePhoneChange={handlePhoneChange}
              displayValueTel={displayValueTel}
              validationError={validationError}
              password={password}
            />
            <button className={styles.auth_button} onClick={onEnter}>
              Войти
            </button>
          </>
        ) : null}
      </div>
      <div className={styles.tab_registration}>
        {tab !== 1 ? (
          <>
            {campId ? (
              <TemplateSiginN
                onChange={onChange}
                username={username}
                handlePhoneChange={handlePhoneChange}
                displayValueTel={displayValueTel}
                validationError={validationError}
              />
            ) : (
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
            )}
            <button className={styles.auth_button} onClick={onEnter}>
              {campId ? 'Забронировать' : 'Зарегистрироваться'}
            </button>
          </>
        ) : null}
      </div>
    </Modal>
  );
};
