import { Suspense, useRef, useState } from 'react';
import { useLoaderData, Await, useAsyncValue, useRevalidator } from 'react-router-dom';
import { useUser } from '../../../context';
import Setting from '../../../assets/setting.svg?react';
import BasketIcon from '../../../assets/basket.svg?react';
import { IHome, IMainBlock } from '../interfaces';
import { Modal } from '../../../templates/modal';
import { creatorRequest, updateMainBlock, uploadImg } from '../../../api';
import styles from '../index.module.css';

export const MainImg: React.FC = () => {
  const { home } = useLoaderData() as {
    home: IHome;
  };

  return (
    <div>
      <Suspense fallback={'Загрузка...'}>
        <Await resolve={home}>
          <MainTemplate />
        </Await>
      </Suspense>
    </div>
  );
};

const MainTemplate = () => {
  const { home } = useAsyncValue() as {
    home: IHome;
  };
  const revalidator = useRevalidator();
  const { user, logout } = useUser();
  const isAdmin = !!user?.roles.includes('ADMIN');

  const imageRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [isOpen, openModal] = useState(false);
  const [error, setError] = useState('');
  const [main, setMain] = useState<IMainBlock | null>(null);

  const openEditMainImg = () => {
    setMain(home.mainBlock);
    openModal(true);
  };

  const closeModal = () => {
    setMain(null);
    setError('');
    openModal(false);
  };

  const handleSubmit = async () => {
    const { error } = await updateMainBlock(main as IMainBlock);
    if (!error) {
      closeModal();
      revalidator.revalidate();
    } else {
      setError(error);
    }
  };

  const deleteImg = () => {
    setMain((prevM) => ({ ...(prevM as IMainBlock), mainImage: null }));
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
        setMain((prevM) => ({
          ...(prevM as IMainBlock),
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
    <>
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
              {main?.mainImage ? (
                <>
                  <span className={styles.image_name}>
                    {main?.mainImage?.name}
                  </span>
                  <span className={styles.text_align_l}>
                    <img
                      src={main?.mainImage.url ? main?.mainImage.url : ''}
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
            <label>{'Заголовок'}</label>
            <input
              value={main?.title}
              onChange={(e) => {
                setMain((prevM) => ({
                  ...(prevM as IMainBlock),
                  title: e.target.value,
                }));
              }}
              className={styles.question_field}
            />
            <label>{'Подзаголовок'}</label>
            <input
              value={main?.subtitle}
              onChange={(e) => {
                setMain((prevM) => ({
                  ...(prevM as IMainBlock),
                  subtitle: e.target.value,
                }));
              }}
              className={styles.question_field}
            />
          </div>
        )}
      </Modal>
      <div className={styles.main_image_wrap}>
        {isAdmin ? (
          <Setting onClick={openEditMainImg} className={styles.setting} />
        ) : null}
        <img
          src={home.mainBlock.mainImage?.url}
          className={styles.main_image}
        />
        <div className={styles.main_title_wrap}>
          <span className={styles.main_title}>{home.mainBlock.title}</span>
          <span className={styles.main_sub_title}>
            {home.mainBlock.subtitle}
          </span>
        </div>
      </div>
    </>
  );
};
