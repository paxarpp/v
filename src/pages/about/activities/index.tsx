import { useAsyncValue, useRevalidator } from 'react-router-dom';
import { IAbout, IActivity } from '../interfaces';
import { ImagePack } from '../../../templates/imagesPack';
import Ball from '../../../assets/ball.svg?react';
import Setting from '../../../assets/setting.svg?react';
import RoundAdd from '../../../assets/roundAdd.svg?react';
import { useUser } from '../../../context';
import { useState } from 'react';
import { Modal } from '../../../templates/modal';
import { IImageBase, ImagesMassSelect } from '../../../templates/imageSelect';
import { creatorRequest, updateActivity, deleteAct } from '../../../api';
import styles from '../index.module.css';

export const Activities = () => {
  const {
    about: { activities },
  } = useAsyncValue() as {
    about: IAbout;
  };

  const revalidator = useRevalidator();

  const { isAdmin, logout } = useUser();
  const [activityAddOpen, setActivityAddOpen] = useState<boolean>(false);
  const [currentActivity, setActivity] = useState<IActivity | null>(null);

  const openEditActivity = (id?: string) => {
    if (id) {
      const activity = activities.find((a) => a.images?.[0]?.entityId === id);
      if (activity) {
        setActivity({ ...activity });
        setActivityAddOpen(true);
      }
    }
  };
  const addActivity = () => {
    setActivityAddOpen(true);
  };

  const onClose = () => {
    setActivity(null);
    setActivityAddOpen(false);
  };

  const deleteImgMass = (id: string) => {
    setActivity((prevA) => ({
      ...(prevA as IActivity),
      images: prevA?.images ? prevA.images.filter((img) => img.id !== id) : [],
    }));
  };
  const onChangeImageMass = (img: IImageBase) => {
    const newImg = {
      entityId: null,
      ...img,
    };
    setActivity((prevA) => ({
      ...(prevA as IActivity),
      images: prevA?.images ? prevA.images.concat([newImg]) : [newImg],
    }));
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivity((prevA) => ({ ...prevA, name: e.target.value }) as IActivity);
  };

  const saveActivity = () => {
    const saveA = async () => {
      if (currentActivity) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall<string>(
          updateActivity({ ...currentActivity }),
        );
        if (!error) {
          onClose();
          revalidator.revalidate();
        }
      }
    };
    saveA();
  };

  const deleteActivity = () => {
    const delC = async () => {
      if (currentActivity?.images?.[0].entityId) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall<boolean>(
          deleteAct(currentActivity.images[0].entityId),
        );
        if (!error) {
          onClose();
          revalidator.revalidate();
        }
      }
    };
    delC();
  };

  return (
    <div className={styles.row_activities}>
      {activityAddOpen ? (
        <Modal
          isOpen={true}
          header={<h2>{'О нас, активности'}</h2>}
          footer={
            <div>
              <button onClick={saveActivity} className={styles.button_save}>
                {'Сохранить'}
              </button>
              <button onClick={deleteActivity} className={styles.button_save}>
                {'Удалить'}
              </button>
            </div>
          }
          close={onClose}
        >
          <div className={styles.activity_modal_content}>
            <label>{'Название блока'}</label>
            <input
              value={currentActivity?.name}
              onChange={onChangeName}
              className={styles.input_field}
            />
            <ImagesMassSelect
              label={'Фотография места проведения'}
              deleteImg={deleteImgMass}
              onChangeImage={onChangeImageMass}
              images={currentActivity?.images}
            />
          </div>
        </Modal>
      ) : null}
      {activities?.map((act) => {
        return (
          <div className={styles.activity_card} key={act.name}>
            <span className={styles.activity_title}>
              <Ball />
              {act.name}
              {isAdmin ? (
                <Setting
                  onClick={() => openEditActivity(act.images?.[0].entityId)}
                  className={styles.setting_activity}
                />
              ) : null}
            </span>
            <ImagePack
              images={act.images}
              width={420}
              height={254}
              widthPreview={74}
              heightPreview={50}
              gapPreview={13}
              marginPreviewTop={20}
            />
          </div>
        );
      })}
      {isAdmin ? (
        <div className={styles.activity_card_add} onClick={addActivity}>
          <RoundAdd />
        </div>
      ) : null}
    </div>
  );
};
