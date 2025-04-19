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

const PHONE_MASK = '+7(XXX)-XXX-XX-XX';

const applyMask = (numbers: string): string => {
  let formatted = PHONE_MASK;
  for (let i = 0; i < numbers.length && i < 10; i++) {
    const digit = numbers[i];
    const position = formatted.indexOf('X');
    if (position !== -1) {
      formatted =
        formatted.substring(0, position) +
        digit +
        formatted.substring(position + 1);
    }
  }
  return formatted;
};

export const CallMe = () => {
  const { logout } = useUser();
  const { isMobile } = useDeviceDetect();
  const [userName, setName] = useState('');
  const [telephone, setTel] = useState('');
  const [answer, setComment] = useState('');
  const [validationError, setValidationError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!inputValue || inputValue === PHONE_MASK) {
      setTel('');
      setValidationError('');
      return;
    }
    const newNumbers = inputValue.replace(/\D/g, '');
    const numbersWith7 = newNumbers.startsWith('7')
      ? newNumbers
      : '7' + newNumbers;
    const limitedNumbers = numbersWith7.slice(0, 11);
    e.target.value = limitedNumbers;
    setTel(e.target.value);
    setValidationError('');
  };

  // Отображаем маску только если есть введенные цифры
  const displayValueTel = telephone
    ? applyMask(telephone.slice(1))
    : PHONE_MASK;

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
    displayValueTel,
    name: userName,
    tel: telephone,
    comment: answer,
    validationError,
    handlePhoneChange,
    onChangeName,
    onChangeComment,
    onSend,
  };
  return (
    <div className={isMobile ? styles.wrapper_mobi : styles.wrapper}>
      <h2 className={isMobile ? styles.title_mobi : styles.title}>
        Остались вопросы?
      </h2>
      <p className={isMobile ? styles.sub_title_mobi : styles.sub_title}>
        Оставьте свой номер телефона и мы свяжемся с вами!
      </p>
      {isMobile ? <MobileTemplate {...props} /> : <Template {...props} />}
    </div>
  );
};
