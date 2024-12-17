import { useState } from 'react';
import { useRevalidator } from 'react-router';
import { Modal } from '../../../templates/modal';
import { creatorRequest, api } from '../../../api';
import { useUser } from '../../../context';
import { IUser } from '../interfaces';
import { InputStyled } from '../../../templates/input';
import styles from '../index.module.css';

export interface IPass {
  id: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ModalPass: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const { logout, user } = useUser();
  const revalidator = useRevalidator();

  const [currentInfo, setCurrentInfo] = useState<IPass>({
    id: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const saveInfo = () => {
    const userInfoUpdate = async () => {
      const axiosCall = creatorRequest(logout);
      const { error } = await axiosCall(
        api.updateUserPass({
          ...currentInfo,
          id: (user as unknown as IUser).id,
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
      header={<h2>{'Изменить пароль'}</h2>}
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
          placeholder={'Старый пароль'}
          type={'password'}
          value={currentInfo?.oldPassword}
          onChange={(e) =>
            setCurrentInfo({ ...currentInfo, oldPassword: e.target.value })
          }
        />
        <InputStyled
          placeholder={'Новый пароль'}
          type={'password'}
          value={currentInfo?.newPassword}
          onChange={(e) =>
            setCurrentInfo({ ...currentInfo, newPassword: e.target.value })
          }
        />
        <InputStyled
          placeholder={'Подтвердите пароль'}
          type={'password'}
          value={currentInfo?.confirmPassword}
          onChange={(e) =>
            setCurrentInfo({ ...currentInfo, confirmPassword: e.target.value })
          }
        />
      </div>
    </Modal>
  );
};
