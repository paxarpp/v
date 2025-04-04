import { useState } from 'react';
import { useDeviceDetect } from '../../hooks';
import { creatorRequest } from '../../api';
import { api } from '../../api/api';
import { useUser } from '../../context';
import { MobileTemplate } from './mobileTemplate';
import { Template } from './template';
import styles from './index.module.css';

const pattern =
  /([\+]?[7|8][\s-(]?[9][0-9]{2}[\s-)]?)?([\d]{3})[\s-]?([\d]{2})[\s-]?([\d]{2})/;

export const CallMe = () => {
  const { logout } = useUser();
  const { isMobile } = useDeviceDetect();
  const [userName, setName] = useState('');
  const [telephone, setTel] = useState('');
  const [answer, setComment] = useState('');
  const [validationError, setValidationError] = useState('');

  const onChangeTel = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const onlyNumbers = e.target.value.replace(/[^\d]/g, '');
      const limitToEight = onlyNumbers.slice(0, 11);
      setTel(limitToEight);
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

  const onSend = async () => {
    if (telephone && userName) {
      if (pattern.test(telephone)) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall(
          api.sendQuestion({ userName, telephone, answer }),
        );
        if (error) {
          setValidationError(error);
        } else {
          setName('');
          setComment('');
          setTel('');
        }
      } else {
        setValidationError('Неверный формат телефона');
      }
    }
  };

  const props = {
    name: userName,
    tel: telephone,
    comment: answer,
    validationError,
    onChangeTel,
    onChangeName,
    onChangeComment,
    onSend,
  };
  return (
    <div className={isMobile ? styles.wrapper_mobi : styles.wrapper}>
      <h2 className={styles.title}>Остались вопросы?</h2>
      <p className={styles.sub_title}>
        Оставьте свой номер телефона и мы свяжемся с вами!
      </p>
      {isMobile ? <MobileTemplate {...props} /> : <Template {...props} />}
    </div>
  );
};
