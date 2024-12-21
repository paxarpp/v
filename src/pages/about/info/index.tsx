import { useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router';
import { useDeviceDetect } from '../../../hooks';
import Setting from '../../../assets/setting.svg?react';
import { IAbout } from '../interfaces';
import { useUser } from '../../../context';
import { Modal } from '../../../templates/modal';
import { IImageBase, ImageSelect } from '../../../templates/imageSelect';
import { creatorRequest, api } from '../../../api';
import { Route } from '../+types';
import styles from '../index.module.css';

export const Info = () => {
  const { about } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();
  const revalidator = useRevalidator();
  const { isAdmin, logout } = useUser();
  const [isOpen, setOpen] = useState(false);
  const [currentAbout, setAbout] = useState<IAbout | null>(null);

  const openEdit = () => {
    setAbout(about);
    setOpen(true);
  };
  const closeModal = () => {
    setAbout(null);
    setOpen(false);
  };

  const aboutUpdate = () => {
    const saveA = async () => {
      if (currentAbout) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall(api.updateAbout({ ...currentAbout }));
        if (!error) {
          closeModal();
          revalidator.revalidate();
        }
      }
    };
    saveA();
  };

  const deleteImg = () => {
    setAbout((prevAbout) =>
      prevAbout
        ? {
            ...prevAbout,
            master: prevAbout.master
              ? { ...prevAbout.master, image: null }
              : null,
          }
        : null,
    );
  };

  const onChangeImage = (img: IImageBase) => {
    setAbout((prevAbout) =>
      prevAbout
        ? {
            ...prevAbout,
            master: {
              name: prevAbout.master?.name || '',
              infos: prevAbout.master?.infos || [],
              image: {
                typeEntity: 'COACH' as const,
                entityId: prevAbout.master?.image?.entityId || null,
                ...img,
              },
            },
          }
        : null,
    );
  };

  return (
    <>
      {isOpen ? (
        <Modal
          isOpen={true}
          close={closeModal}
          header={<h2>{'Карточка о нас'}</h2>}
          footer={<button onClick={aboutUpdate}>{'Сохранить'}</button>}
        >
          <div className={styles.about_modal}>
            <label>{'Заголовок'}</label>
            <input
              value={currentAbout?.title}
              className={styles.input_field}
              onChange={(e) => {
                setAbout((prevAbout) => ({
                  ...(prevAbout as IAbout),
                  title: e.target.value,
                }));
              }}
            />
            <label>{'Подзаголовок 1'}</label>
            <input
              value={currentAbout?.subTitleFirst}
              className={styles.input_field}
              onChange={(e) => {
                setAbout((prevAbout) => ({
                  ...(prevAbout as IAbout),
                  subTitleFirst: e.target.value,
                }));
              }}
            />
            <label>{'Подзаголовок 2'}</label>
            <input
              value={currentAbout?.subTitleSecond}
              className={styles.input_field}
              onChange={(e) => {
                setAbout((prevAbout) => ({
                  ...(prevAbout as IAbout),
                  subTitleSecond: e.target.value,
                }));
              }}
            />
            <label>{'Количество тренировок'}</label>
            <input
              value={currentAbout?.numberOfWorkouts}
              className={styles.input_field}
              onChange={(e) => {
                setAbout((prevAbout) => ({
                  ...(prevAbout as IAbout),
                  numberOfWorkouts: e.target.value,
                }));
              }}
            />
            <label>{'Количество кемпов'}</label>
            <input
              value={currentAbout?.numberOfCamps}
              className={styles.input_field}
              onChange={(e) => {
                setAbout((prevAbout) => ({
                  ...(prevAbout as IAbout),
                  numberOfCamps: e.target.value,
                }));
              }}
            />
            <label>{'Количество учеников'}</label>
            <input
              value={currentAbout?.numberOfStudents}
              className={styles.input_field}
              onChange={(e) => {
                setAbout((prevAbout) => ({
                  ...(prevAbout as IAbout),
                  numberOfStudents: e.target.value,
                }));
              }}
            />
            <label>{'Имя Фамилия'}</label>
            <input
              value={currentAbout?.master?.name}
              className={styles.input_field}
              onChange={(e) => {
                setAbout((prevAbout) =>
                  prevAbout
                    ? {
                        ...prevAbout,
                        master: prevAbout.master
                          ? {
                              ...prevAbout.master,
                              name: e.target.value,
                            }
                          : null,
                      }
                    : null,
                );
              }}
            />
            <label>{'Информация'}</label>
            <textarea
              value={currentAbout?.master?.infos.join(';')}
              className={styles.textarea_field}
              onChange={(e) => {
                setAbout((prevAbout) =>
                  prevAbout
                    ? {
                        ...prevAbout,
                        master: prevAbout.master
                          ? {
                              ...prevAbout.master,
                              infos: e.target.value.split(';'),
                            }
                          : null,
                      }
                    : null,
                );
              }}
            />
            <ImageSelect
              label={'Фотографии блока'}
              onChangeImage={onChangeImage}
              deleteImg={deleteImg}
              currentImage={currentAbout?.master?.image}
            />
          </div>
        </Modal>
      ) : null}
      <h2>
        {'О нас'}
        {isAdmin ? (
          <Setting onClick={openEdit} className={styles.setting_about} />
        ) : null}
      </h2>
      <h2>{about.title}</h2>
      <h3>{about.subTitleFirst}</h3>
      <h3>{about.subTitleSecond}</h3>
      <div className={isMobile ? styles.row_info_mobile : styles.row_info}>
        <div className={styles.block}>
          <span
            className={styles.sub_title}
          >{`> ${about.numberOfWorkouts} тренировок`}</span>
        </div>
        <div className={styles.block}>
          <span
            className={styles.sub_title}
          >{`> ${about.numberOfCamps} кемпов`}</span>
        </div>
        <div className={styles.block}>
          <span
            className={styles.sub_title}
          >{`> ${about.numberOfStudents} учеников`}</span>
        </div>
      </div>
    </>
  );
};
