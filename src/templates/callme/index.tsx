import { useState } from 'react';
import { useDeviceDetect } from '../../hooks';
import { Template } from './template';
import { MobileTemplate } from './mobileTemplate';
import styles from './index.module.css';

export const CallMe = () => {
  const { isMobile } = useDeviceDetect();
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [comment, setComment] = useState('');
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

  const onSend = () => {
    const pattern =
      /([\+]?[7|8][\s-(]?[9][0-9]{2}[\s-)]?)?([\d]{3})[\s-]?([\d]{2})[\s-]?([\d]{2})/;
    if (tel && name) {
      if (pattern.test(tel)) {
        //
      } else {
        setValidationError('Неверный формат телефона');
      }
    }
  };

  const props = {
    name,
    tel,
    comment,
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
