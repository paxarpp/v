import { useState } from 'react';
import { useParams, useRevalidator } from 'react-router';
import { Modal } from '../../../templates/modal';
import { creatorRequest } from '../../../api';
import { api } from '../../../api/api';
import { useUser } from '../../../context';
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
  const { id } = useParams<{ id: string }>();
  const { logout } = useUser();
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
          id: id as string,
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
