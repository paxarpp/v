import { Suspense, useState } from 'react';
import {
  useLoaderData,
  Await,
  useAsyncValue,
  useRevalidator,
} from 'react-router-dom';
import { useUser } from '../../../context';
import Setting from '../../../assets/setting.svg?react';
import { IHome, IMainBlock } from '../interfaces';
import { Modal } from '../../../templates/modal';
import { updateMainBlock } from '../../../api';
import { IImageBase, ImageSelect } from '../../../templates/imageSelect';
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
  const { user } = useUser();
  const isAdmin = !!user?.roles.includes('ADMIN');

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
  };

  const onChangeImage = (img: IImageBase) => {
    setMain((prevM) => ({
      ...(prevM as IMainBlock),
      mainImage: {
        entityId: '', // todo
        typeEntity: 'COACH' as const,
        ...img,
      },
    }));
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
            <ImageSelect
              label={'Фото тренера'}
              currentImage={main?.mainImage}
              onChangeImage={onChangeImage}
              deleteImg={deleteImg}
            />
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