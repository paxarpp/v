import { useRef, useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router';
import Phone from '../../../assets/phone.svg?react';
import Mail from '../../../assets/mail.svg?react';
import Vk from '../../../assets/vk.svg?react';
import T from '../../../assets/t.svg?react';
import Setting from '../../../assets/setting.svg?react';
import Basket from '../../../assets/basket.svg?react';
import { useUser } from '../../../context';
import { IContactBlock, IManager } from '../interfaces';
import { api } from '../../../api/api';
import { creatorRequest } from '../../../api';
import { Modal } from '../../../templates/modal';
import { IImageBase, ImageSelect } from '../../../templates/imageSelect';
import { Route } from '../+types';
import { createImageUrl, createLinkTg } from '../../../constants';
import { useDeviceDetect } from '../../../hooks';
import { UniversalScroller } from '../../../templates/UniversalScroller';
import styles from '../index.module.css';

export const Contacts: React.FC = () => {
  const { home } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();

  const revalidator = useRevalidator();
  const { isAdmin, logout } = useUser();
  const [isOpen, openModal] = useState(false);
  const [error, setError] = useState('');
  const [contact, setContact] = useState<IContactBlock | null>(null);
  const refMangers = useRef<IManager | null>(null);

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

  const deleteImg = (indx: number) => {
    setContact((prevC) => ({
      ...(prevC as IContactBlock),
      managers: (prevC as IContactBlock).managers.map((m, i) => {
        if (i === indx) {
          return {
            ...m,
            imageAdmin: {
              id: null,
              url: '',
            },
          };
        }
        return m;
      }),
    }));
  };

  const onChangeImage = (img: IImageBase, indx: number) => {
    setContact((prevC) => ({
      ...(prevC as IContactBlock),
      managers: (prevC as IContactBlock).managers.map((m, i) => {
        if (i === indx) {
          return {
            ...(m as IManager),
            imageAdmin: {
              ...img,
              entityId: home.id,
              typeEntity: 'PAGE_HOME' as const,
            },
          };
        }
        return m;
      }),
    }));
  };

  const addManager = () => {
    setContact((prevC) => ({
      ...(prevC as IContactBlock),
      managers: (prevC as IContactBlock).managers.concat([
        {
          imageAdmin: {
            id: null,
          },
          textUnderImage: '',
          email: '',
          contacts: '',
        },
      ]),
    }));
  };

  const deleteManager = (indx: number) => {
    setContact((prevC) => ({
      ...(prevC as IContactBlock),
      managers: (prevC as IContactBlock).managers.filter((_, i) => i !== indx),
    }));
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        close={closeModal}
        classNameModal={
          isMobile ? styles.modal_questions_mobi : styles.modal_questions
        }
        header={
          <div
            className={
              isMobile
                ? styles.modal_question_header_mobi
                : styles.modal_question_header
            }
          >
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
              value={contact?.linkTg}
              onChange={(e) => {
                setContact((prevC) => ({
                  ...(prevC as IContactBlock),
                  linkTg: e.target.value,
                }));
              }}
              className={styles.question_field}
            />
            <button onClick={addManager} className={styles.mng_button}>
              {'Добавить манеджера'}
            </button>
            {contact?.managers.map((manager, index) => {
              return (
                <div
                  key={`${manager.imageAdmin.id}-${index}`}
                  className={styles.manager_form}
                >
                  <Basket onClick={() => deleteManager(index)} />
                  <ImageSelect
                    label={'Фотография менеджера'}
                    currentImage={manager.imageAdmin}
                    deleteImg={() => deleteImg(index)}
                    onChangeImage={(m) => onChangeImage(m, index)}
                  />
                  <label>{'Текст под фото'}</label>
                  <input
                    value={manager.textUnderImage}
                    onChange={(e) => {
                      setContact((prevC) => ({
                        ...(prevC as IContactBlock),
                        managers: (prevC as IContactBlock).managers.map(
                          (m, i) => {
                            if (i === index) {
                              return {
                                ...(m as IManager),
                                textUnderImage: e.target.value,
                              };
                            }
                            return m;
                          },
                        ),
                      }));
                    }}
                    className={styles.question_field}
                  />
                  <label>{'Электронная почта'}</label>
                  <input
                    value={manager.email}
                    onChange={(e) => {
                      setContact((prevC) => ({
                        ...(prevC as IContactBlock),
                        managers: (prevC as IContactBlock).managers.map(
                          (m, i) => {
                            if (i === index) {
                              return {
                                ...(m as IManager),
                                email: e.target.value,
                              };
                            }
                            return m;
                          },
                        ),
                      }));
                    }}
                    className={styles.question_field}
                  />
                  <label>{'Контакты'}</label>
                  <input
                    value={manager.contacts}
                    onChange={(e) => {
                      setContact((prevC) => ({
                        ...(prevC as IContactBlock),
                        managers: (prevC as IContactBlock).managers.map(
                          (m, i) => {
                            if (i === index) {
                              return {
                                ...(m as IManager),
                                contacts: e.target.value,
                              };
                            }
                            return m;
                          },
                        ),
                      }));
                    }}
                    className={styles.question_field}
                  />
                </div>
              );
            })}
          </div>
        )}
      </Modal>
      <h3
        className={
          isMobile ? styles.contacts_title_mobi : styles.contacts_title
        }
      >
        {'Контакты'}
        {isAdmin ? (
          <Setting
            onClick={openEditContact}
            className={isMobile ? styles.setting_mobi : styles.setting_q}
          />
        ) : null}
      </h3>
      <div className={isMobile ? styles.flex_mobi : styles.flex}>
        <div
          className={isMobile ? styles.contact_wrap_mobi : styles.contact_wrap}
        >
          <div className={styles.contact}>
            <Phone className={isMobile ? styles.icon_contact_mobi : ''} />
            <span className={isMobile ? styles.text_mobi : styles.text}>
              {refMangers.current?.contacts}
            </span>
          </div>
          <div className={styles.contact}>
            <Mail className={isMobile ? styles.icon_contact_mobi : ''} />
            <span className={isMobile ? styles.text_mobi : styles.text}>
              {refMangers.current?.email}
            </span>
          </div>
          {!isMobile ? (
            <div className={styles.contact_icons}>
              <a href={home?.contactBlock?.linkVk} target={'_blank'}>
                <Vk />
              </a>
              <a
                href={createLinkTg(home?.contactBlock?.linkTg)}
                target={'_blank'}
              >
                <T className={styles.contact_icon} />
              </a>
            </div>
          ) : null}
        </div>
        <div
          className={isMobile ? styles.manager_wrap_mobi : styles.manager_wrap}
        >
          <UniversalScroller<IManager>
            responsive={{
              desktopXXL: {
                breakpoint: { max: 3000, min: 1 },
                items: 1,
                slidesToSlide: 1,
              },
            }}
            list={home?.contactBlock.managers || []}
            renderItem={(m) => {
              refMangers.current = m;
              return (
                <div key={m.imageAdmin.id}>
                  <div
                    className={
                      isMobile ? styles.img_wrap_mobi : styles.img_wrap
                    }
                  >
                    <img
                      className={
                        isMobile ? styles.manager_mobi : styles.manager
                      }
                      src={createImageUrl(m.imageAdmin.url)}
                      alt="manager"
                    />
                  </div>
                  <span
                    className={
                      isMobile ? styles.text_manager_mobi : styles.text_manager
                    }
                  >
                    {m.textUnderImage}
                  </span>
                </div>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};
