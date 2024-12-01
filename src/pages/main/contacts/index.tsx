import { Suspense, useRef, useState } from 'react';
import { Await, useAsyncValue, useLoaderData, useRevalidator } from 'react-router-dom';
import Phone from '../../../assets/phone.svg?react';
import Mail from '../../../assets/mail.svg?react';
import Vk from '../../../assets/vk.svg?react';
import T from '../../../assets/t.svg?react';
import Inst from '../../../assets/inst.svg?react';
import Setting from '../../../assets/setting.svg?react';
import BasketIcon from '../../../assets/basket.svg?react';
import { useUser } from '../../../context';
import { IHome, IContactBlock } from '../interfaces';
import {
  updateContactBlock,
  creatorRequest,
  logout,
  uploadImg,
} from '../../../api';
import { Modal } from '../../../templates/modal';
import styles from '../index.module.css';

export const Contacts: React.FC = () => {
  const { home } = useLoaderData() as {
    home: IHome;
  };

  return (
    <div>
      <Suspense fallback={'Загрузка...'}>
        <Await resolve={home}>
          <ContactsTemplate />
        </Await>
      </Suspense>
    </div>
  );
};

export const ContactsTemplate = () => {
  const { home } = useAsyncValue() as {
    home: IHome;
  };
  const revalidator = useRevalidator();
  const { user } = useUser();
  const isAdmin = !!user?.roles.includes('ADMIN');

  const imageRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [isOpen, openModal] = useState(false);
  const [error, setError] = useState('');
  const [contact, setContact] = useState<IContactBlock | null>(null);

  const openEditContact = () => {
    setContact(home.contactBlock);
    openModal(true);
  };

  const closeModal = () => {
    setContact(null);
    setError('');
    openModal(false);
  };

  const handleSubmit = async () => {
    const { error } = await updateContactBlock(contact as IContactBlock);
    if (!error) {
      closeModal();
      revalidator.revalidate();
    } else {
      setError(error);
    }
  };

  const deleteImg = () => {
    setContact((prevM) => ({ ...(prevM as IContactBlock), mainImage: null }));
    formRef.current?.reset();
  };

  const onChangeImage = (e) => {
    const imageUploader = async () => {
      const file = e.target.files?.[0];
      if (file) {
        const axiosCall = creatorRequest(logout);
        const formData = new FormData();
        formData.append('file', file);
        const { result, error } = await axiosCall<{ id: string; url: string }>(
          uploadImg(formData),
        );
        setContact((prevM) => ({
          ...(prevM as IContactBlock),
          mainImage: {
            entityId: '', // todo
            typeEntity: 'COACH' as const,
            name: file.name,
            contentType: file.type,
            size: file.size,
            id: result.data.result.id,
            url: result.data.result.url,
          },
        }));
      }
    };
    imageUploader();
  };

  const onBtnImg = () => {
    imageRef.current?.click();
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
            <>
              <span className={styles.text_align_l}>
                <span className={styles.img_label}>{'Фото тренера'}</span>
                <button onClick={onBtnImg} className={styles.button}>
                  Выбрать файл
                </button>
              </span>
              <form ref={formRef}>
                <input
                  className={styles.input_image}
                  type="file"
                  onChange={onChangeImage}
                  ref={imageRef}
                />
              </form>
              {contact?.imageAdmin ? (
                <>
                  <span className={styles.image_name}>
                    {contact?.imageAdmin?.name}
                  </span>
                  <span className={styles.text_align_l}>
                    <img
                      src={
                        contact?.imageAdmin.url ? contact?.imageAdmin.url : ''
                      }
                      alt=""
                      className={styles.upload_coach_img}
                    />
                    <BasketIcon onClick={deleteImg} />
                  </span>
                </>
              ) : (
                <div className={styles.stub_img}>+</div>
              )}
            </>
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
            {home.contactBlock?.contacts}
          </div>
          <div className={styles.contact}>
            <Mail />
            {home.contactBlock?.email}
          </div>
          <div className={styles.mt_20}>
            <a href={home.contactBlock?.linkVk} target={'_blank'}>
              <Vk />
            </a>
            <a href={home.contactBlock?.lingTg} target={'_blank'}>
              <T className={styles.contact_icon} />
            </a>
            <a href={home.contactBlock?.linkInstagram} target={'_blank'}>
              <Inst />
            </a>
          </div>
        </div>
        <div className={styles.manager_wrap}>
          <div className={styles.img_wrap}>
            <img
              className={styles.manager}
              src={home.contactBlock?.imageAdmin?.url}
              alt="manager"
            />
          </div>
          <span>{home.contactBlock?.textUnderImage}</span>
        </div>
      </div>
    </div>
  );
};
