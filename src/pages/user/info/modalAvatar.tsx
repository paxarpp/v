import { useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router';
import { Modal } from '../../../templates/modal';
import { creatorRequest } from '../../../api';
import { api } from '../../../api/api';
import { useUser } from '../../../context';
import { IImage } from '../interfaces';
import { Route } from '../+types';
import { IImageBase, ImageSelect } from '../../../templates/imageSelect';
import styles from '../index.module.css';

export const ModalAvatar: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const { user } = useLoaderData<Route.ComponentProps['loaderData']>();
  const revalidator = useRevalidator();

  const [currentAvatar, setCurrentAvatar] = useState<IImage | null | undefined>(
    user?.avatar,
  );

  const { logout } = useUser();

  const saveAvatar = () => {
    const userAvatarUpdate = async () => {
      const axiosCall = creatorRequest(logout);
      const { error } = await axiosCall(
        api.updateUserAvatar({
          profileId: user?.avatar?.entityId,
          avatar: currentAvatar,
        }),
      );
      if (!error) {
        revalidator.revalidate();
        closeModal();
      }
    };
    userAvatarUpdate();
  };

  const deleteImg = () => {
    setCurrentAvatar(null);
  };

  const onChangeImage = (img: IImageBase) => {
    setCurrentAvatar({
      typeEntity: 'COACH',
      entityId: user?.avatar?.entityId,
      ...img,
    });
  };

  return (
    <Modal
      isOpen={true}
      close={closeModal}
      header={<h2>{'Редактировать фото'}</h2>}
      footer={
        <div>
          <button className={styles.button_save} onClick={saveAvatar}>
            {'Сохранить'}
          </button>
        </div>
      }
      classNameModal={styles.modal_edit_info}
    >
      <div className={styles.column_info}>
        <ImageSelect
          label={'Фотография'}
          deleteImg={deleteImg}
          onChangeImage={onChangeImage}
          currentImage={currentAvatar}
        />
      </div>
    </Modal>
  );
};