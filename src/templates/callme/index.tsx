import { useState } from 'react';
import { useDeviceDetect } from '../../hooks';
import { creatorRequest } from '../../api';
import { api } from '../../api/api';
import { useUser } from '../../context';
import { MobileTemplate } from './mobileTemplate';
import { Template } from './template';
import styles from './index.module.css';

export const CallMe = () => {
  const { logout } = useUser();
  const { isMobile } = useDeviceDetect();
  const [userName, setName] = useState('');
  const [telephone, setTel] = useState('');
  const [answer, setComment] = useState('');
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

  const sendQuestion = () => {
    const sendQ = async () => {
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
    };
    sendQ();
  };

  const onSend = () => {
    const pattern =
      /([\+]?[7|8][\s-(]?[9][0-9]{2}[\s-)]?)?([\d]{3})[\s-]?([\d]{2})[\s-]?([\d]{2})/;
    if (telephone && userName) {
      if (pattern.test(telephone)) {
        sendQuestion();
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
