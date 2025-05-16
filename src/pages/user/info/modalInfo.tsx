import { useState } from 'react';
import { useLoaderData, useParams, useRevalidator } from 'react-router';
import { Modal } from '../../../templates/modal';
import { creatorRequest } from '../../../api';
import { api } from '../../../api/api';
import { useUser } from '../../../context';
import { IUserInfo } from '../interfaces';
import { InputStyled } from '../../../templates/input';
import { Route } from '../+types';
import { applyMask, PHONE_MASK } from '../../../constants';
import styles from '../index.module.css';

export const ModalInfo: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const { user } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { id } = useParams<{ id: string }>();
  const revalidator = useRevalidator();

  const [currentInfo, setCurrentInfo] = useState<IUserInfo | null>(user);
  const [validationError, setValidationError] = useState('');

  const { logout } = useUser();

  const saveInfo = () => {
    const userInfoUpdate = async () => {
      const axiosCall = creatorRequest(logout);
      const { error } = await axiosCall(
        api.updateUser({
          id: id as string,
          email: currentInfo.email,
          telephone: currentInfo.telephone,
          fullName: currentInfo.fullName,
          birthday: currentInfo.birthday,
        }),
      );
      if (!error) {
        revalidator.revalidate();
        closeModal();
      }
    };
    userInfoUpdate();
  };

  // Отображаем маску только если есть введенные цифры
  const displayValueTel = currentInfo?.telephone
    ? applyMask(currentInfo.telephone.slice(1))
    : PHONE_MASK;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!inputValue || inputValue === PHONE_MASK) {
      setCurrentInfo({ ...currentInfo, telephone: '' });
      setValidationError('');
      return;
    }
    const newNumbers = inputValue.replace(/\D/g, '');
    const numbersWith7 = newNumbers.startsWith('7')
      ? newNumbers
      : '7' + newNumbers;
    const limitedNumbers = numbersWith7.slice(0, 11);
    e.target.value = limitedNumbers;
    setCurrentInfo({ ...currentInfo, telephone: e.target.value });
    setValidationError('');
  };

  return (
    <Modal
      isOpen={true}
      close={closeModal}
      header={<h2>{'Редактировать данные'}</h2>}
      footer={
        <div>
          <button className={styles.button_save} onClick={saveInfo}>
            {'Сохранить'}
          </button>
        </div>
      }
      classNameModal={styles.modal_edit_info}
    >
      <div className={styles.column_info}>
        <InputStyled
          placeholder={'Имя'}
          value={currentInfo?.fullName}
          onChange={(e) =>
            setCurrentInfo({ ...currentInfo, fullName: e.target.value })
          }
        />
        <InputStyled
          placeholder={'Дата рождения'}
          value={currentInfo?.birthday}
          onChange={(e) =>
            setCurrentInfo({ ...currentInfo, birthday: e.target.value })
          }
        />
        <InputStyled
          placeholder={'E-mail'}
          value={currentInfo?.email}
          onChange={(e) =>
            setCurrentInfo({ ...currentInfo, email: e.target.value })
          }
        />
        <InputStyled
          type="tel"
          placeholder={'Телефон'}
          value={displayValueTel}
          onChange={handlePhoneChange}
          validationError={validationError}
        />
      </div>
    </Modal>
  );
};
