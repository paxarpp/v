import { useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router';
import Phone from '../../../assets/phone.svg?react';
import Mail from '../../../assets/mail.svg?react';
import Vk from '../../../assets/vk.svg?react';
import T from '../../../assets/t.svg?react';
import Inst from '../../../assets/inst.svg?react';
import Setting from '../../../assets/setting.svg?react';
import { useUser } from '../../../context';
import { IContactBlock } from '../interfaces';
import { api } from '../../../api/api';
import { creatorRequest } from '../../../api';
import { Modal } from '../../../templates/modal';
import { IImageBase, ImageSelect } from '../../../templates/imageSelect';
import { Route } from '../+types';
import { createLinkTg } from '../../../constants';
import styles from '../index.module.css';

export const Contacts: React.FC = () => {
  const { home } = useLoaderData<Route.ComponentProps['loaderData']>();

  const revalidator = useRevalidator();
  const { isAdmin, logout } = useUser();
  const [isOpen, openModal] = useState(false);
  const [error, setError] = useState('');
  const [contact, setContact] = useState<IContactBlock | null>(null);

  const openEditContact = () => {
    if (home) {
      setContact(home.contactBlock);
      openModal(true);
    }
  };

  const closeModal = () => {
    setContact(null);
    setError('');
    openModal(false);
  };

  const handleSubmit = async () => {
    const axiosCall = creatorRequest(logout);
    const { error } = await axiosCall(
      api.updateContactBlock(contact as IContactBlock),
    );
    if (!error) {
      closeModal();
      revalidator.revalidate();
    } else {
      setError(error);
    }
  };

  const deleteImg = () => {
    setContact((prevC) => ({ ...(prevC as IContactBlock), imageAdmin: null }));
  };

  const onChangeImage = (img: IImageBase) => {
    setContact((prevC) => ({
      ...(prevC as IContactBlock),
      imageAdmin: {
        entityId: home.id,
        typeEntity: 'PAGE_HOME' as const,
        ...img,
      },
    }));
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        close={closeModal}
        classNameModal={styles.modal_questions}
        header={
          <div className={styles.modal_question_header}>
            {'Главная страница'}
          </div>
        }
        footer={
          <div className={styles.modal_question_footer}>
            <button className={styles.question_button} onClick={handleSubmit}>
              {'Сохранить'}
            </button>
          </div>
        }
      >
        {error ? (
          error
        ) : (
          <div className={styles.form_question}>
            <label>{'Контакты'}</label>
            <input
              value={contact?.contacts}
              onChange={(e) => {
                setContact((prevC) => ({
                  ...(prevC as IContactBlock),
                  contacts: e.target.value,
                }));
              }}
              className={styles.question_field}
            />
            <label>{'Электронная почта'}</label>
            <input
              value={contact?.email}
              onChange={(e) => {
                setContact((prevC) => ({
                  ...(prevC as IContactBlock),
                  email: e.target.value,
                }));
              }}
              className={styles.question_field}
            />
            <label>{'Ссылка Вконтакте'}</label>
            <input
              value={contact?.linkVk}
              onChange={(e) => {
                setContact((prevC) => ({
                  ...(prevC as IContactBlock),
                  linkVk: e.target.value,
                }));
              }}
              className={styles.question_field}
            />
            <label>{'Ссылка Телеграмм'}</label>
            <input
              value={contact?.lingTg}
              onChange={(e) => {
                setContact((prevC) => ({
                  ...(prevC as IContactBlock),
                  lingTg: e.target.value,
                }));
              }}
              className={styles.question_field}
            />
            <label>{'Ссылка Инстаграмм'}</label>
            <input
              value={contact?.linkInstagram}
              onChange={(e) => {
                setContact((prevC) => ({
                  ...(prevC as IContactBlock),
                  linkInstagram: e.target.value,
                }));
              }}
              className={styles.question_field}
            />
            <ImageSelect
              label={'Фотография менеджера'}
              currentImage={contact?.imageAdmin}
              deleteImg={deleteImg}
              onChangeImage={onChangeImage}
            />
            <label>{'Текст под фото'}</label>
            <input
              value={contact?.textUnderImage}
              onChange={(e) => {
                setContact((prevC) => ({
                  ...(prevC as IContactBlock),
                  textUnderImage: e.target.value,
                }));
              }}
              className={styles.question_field}
            />
          </div>
        )}
      </Modal>
      <h3>
        {'Контакты'}
        {isAdmin ? (
          <Setting onClick={openEditContact} className={styles.setting_q} />
        ) : null}
      </h3>
      <div className={styles.flex}>
        <div className={styles.contact_wrap}>
          <div className={styles.contact}>
            <Phone />
            {home?.contactBlock?.contacts}
          </div>
          <div className={styles.contact}>
            <Mail />
            {home?.contactBlock?.email}
          </div>
          <div className={styles.mt_20}>
            <a href={home?.contactBlock?.linkVk} target={'_blank'}>
              <Vk />
            </a>
            <a
              href={createLinkTg(home?.contactBlock?.lingTg)}
              target={'_blank'}
            >
              <T className={styles.contact_icon} />
            </a>
            <a href={home?.contactBlock?.linkInstagram} target={'_blank'}>
              <Inst />
            </a>
          </div>
        </div>
        <div className={styles.manager_wrap}>
          <div className={styles.img_wrap}>
            <img
              className={styles.manager}
              src={home?.contactBlock?.imageAdmin?.url}
              alt="manager"
            />
          </div>
          <span>{home?.contactBlock?.textUnderImage}</span>
        </div>
      </div>
    </div>
  );
};
