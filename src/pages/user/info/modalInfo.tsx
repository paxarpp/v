import { useState } from 'react';
import { useAsyncValue, useRevalidator } from 'react-router-dom';
import { Modal } from '../../../templates/modal';
import { creatorRequest, updateUser } from '../../../api';
import { useUser } from '../../../context';
import { IUser, IUserInfo } from '../interfaces';
import { InputStyled } from '../../../templates/input';
import styles from '../index.module.css';

export const ModalInfo: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const { user } = useAsyncValue() as {
    user: IUser;
  };
  const revalidator = useRevalidator();

  const [currentInfo, setCurrentInfo] = useState<IUserInfo>(user);

  const { logout, user: authUser } = useUser();

  const saveInfo = () => {
    const userInfoUpdate = async () => {
      const axiosCall = creatorRequest(logout);
      const { error } = await axiosCall<IUserInfo>(
        updateUser({
          id: authUser.id,
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
          placeholder={'Телефон'}
          value={currentInfo?.telephone}
          onChange={(e) =>
            setCurrentInfo({ ...currentInfo, telephone: e.target.value })
          }
        />
      </div>
    </Modal>
  );
};