import { useLoaderData, useRevalidator } from 'react-router';
import { IActivity } from '../interfaces';
import { ImagePack } from '../../../templates/imagesPack';
import Ball from '../../../assets/ball.svg?react';
import Setting from '../../../assets/setting.svg?react';
import RoundAdd from '../../../assets/roundAdd.svg?react';
import { useUser } from '../../../context';
import { useState } from 'react';
import { Modal } from '../../../templates/modal';
import { IImageBase, ImagesMassSelect } from '../../../templates/imageSelect';
import { creatorRequest } from '../../../api';
import { api } from '../../../api/api';
import { Route } from '../+types';
import { useDeviceDetect } from '../../../hooks';
import styles from '../index.module.css';

export const Activities = () => {
  const { about } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();
  const revalidator = useRevalidator();

  const { isAdmin, logout } = useUser();
  const [activityAddOpen, setActivityAddOpen] = useState<boolean>(false);
  const [currentActivity, setActivity] = useState<IActivity | null>(null);
  const [currentId, setId] = useState<string | null>(null);

  const openEditActivity = (id?: string | null) => {
    if (id) {
      const activity = about?.activities.find((a) => a.id === id);
      if (activity) {
        setId(id);
        setActivity({ ...activity });
        setActivityAddOpen(true);
      }
    }
  };
  const addActivity = () => {
    setActivityAddOpen(true);
  };

  const onClose = () => {
    setId(null);
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
      entityId: currentActivity ? currentActivity.id : null,
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
        const { error } = await axiosCall(
          api.updateActivity({ ...currentActivity }),
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
      if (currentId) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall(api.deleteAct(currentId));
        if (!error) {
          onClose();
          revalidator.revalidate();
        }
      }
    };
    delC();
  };

  return (
    <div
      className={isMobile ? styles.row_activities_mobi : styles.row_activities}
    >
      {activityAddOpen ? (
        <Modal
          isOpen={true}
          header={<h2>{'Карточка активности'}</h2>}
          footer={
            <div className={styles.activity_footer}>
              <button onClick={saveActivity} className={styles.button_save}>
                {'Сохранить'}
              </button>
              {currentId ? (
                <button onClick={deleteActivity} className={styles.button_save}>
                  {'Удалить'}
                </button>
              ) : null}
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
      {about?.activities?.map((act) => {
        return (
          <div
            className={
              isMobile ? styles.activity_card_mobi : styles.activity_card
            }
            key={act.id}
          >
            <span
              className={
                isMobile ? styles.activity_title_mobi : styles.activity_title
              }
            >
              <Ball className={isMobile ? styles.ball_mobi : styles.ball} />
              {act.name}
              {isAdmin ? (
                <Setting
                  onClick={() => openEditActivity(act.id)}
                  className={styles.setting_activity}
                />
              ) : null}
            </span>
            <ImagePack
              images={act.images}
              width={isMobile ? 335 : 420}
              height={isMobile ? 231 : 254}
              widthPreview={isMobile ? 60 : 74}
              heightPreview={isMobile ? 41 : 50}
              gapPreview={13}
              marginPreviewTop={8}
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
